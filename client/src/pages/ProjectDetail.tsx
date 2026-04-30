import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import projectService from '../services/projectService';
import taskService from '../services/taskService';
import TaskCard from '../components/Tasks/TaskCard';
import TaskForm from '../components/Tasks/TaskForm';
import ProjectForm from '../components/Projects/ProjectForm';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      if (!id) return;
      const [projRes, taskRes] = await Promise.all([
        projectService.getProject(id),
        taskService.fetchTasks({ projectId: id }),
      ]);
      setProject(projRes.data);
      setTasks(taskRes.data);
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  const columns = ['todo', 'in_progress', 'review', 'done'];
  const tasksByStatus = columns.reduce((acc, status) => {
    acc[status] = tasks.filter((t) => t.status === status);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-2">{project.name}</h2>
          <p className="text-purple-600 text-lg">{project.description}</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setShowEditModal(true)}>Edit</Button>
        )}
      </div>

      {/* Members Section */}
      {project.members && project.members.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">Team Members</h3>
          <div className="flex gap-2 flex-wrap">
            {project.members.map((m: any) => (
              <div key={m.id} className="card p-3 text-sm bg-white border border-purple-200/50 hover:shadow-md transition">{m.name}</div>
            ))}
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((status) => (
          <div key={status} className="flex-shrink-0 w-80 bg-white rounded-lg p-4 border border-purple-200/30 shadow-sm">
            <h3 className="font-bold text-blue-900 mb-4 capitalize text-lg">{status.replace('_', ' ')}</h3>
            <div className="space-y-3 min-h-96">
              {tasksByStatus[status].map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            </div>
            {user?.role === 'admin' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowTaskModal(true)}
                className="w-full mt-4 text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                + Add Task
              </Button>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={showTaskModal} title="New Task" onClose={() => setShowTaskModal(false)}>
        <TaskForm
          projectId={id}
          onSaved={async () => {
            setShowTaskModal(false);
            await fetch();
          }}
          onCancel={() => setShowTaskModal(false)}
        />
      </Modal>

      <Modal isOpen={showEditModal} title="Edit Project" onClose={() => setShowEditModal(false)}>
        <ProjectForm
          initial={project}
          onSaved={async () => {
            setShowEditModal(false);
            await fetch();
          }}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetail;
