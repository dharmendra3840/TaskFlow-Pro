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

  const columns = [
    { key: 'todo', title: 'Todo', subtitle: 'Queued for work', accent: 'from-slate-500 to-slate-700' },
    { key: 'in_progress', title: 'In Progress', subtitle: 'Actively moving', accent: 'from-blue-500 to-cyan-500' },
    { key: 'review', title: 'Review', subtitle: 'Under approval', accent: 'from-purple-500 to-fuchsia-500' },
    { key: 'done', title: 'Done', subtitle: 'Completed and delivered', accent: 'from-emerald-500 to-teal-500' },
  ] as const;
  const tasksByStatus = columns.reduce((acc, status) => {
    acc[status.key] = tasks.filter((t) => t.status === status.key);
    return acc;
  }, {} as Record<string, any[]>);

  const isAdmin = user?.role === 'admin';

  const handleStatusChange = async (taskId: string, status: 'todo' | 'in_progress' | 'review' | 'done') => {
    if (!isAdmin) return;
    await taskService.updateTask(taskId, { status });
    await fetch();
  };

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

      <div className="mb-8 rounded-3xl border border-purple-200/50 bg-white/70 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-500">Project flow</p>
            <h3 className="text-xl font-bold text-blue-900">Work is tracked as a live status stream</h3>
          </div>
          <div className="text-sm text-slate-600">
            {tasks.length} task{tasks.length === 1 ? '' : 's'} total
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-6 right-6 top-6 h-1 rounded-full bg-gradient-to-r from-slate-200 via-blue-200 via-purple-200 to-emerald-200" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 relative z-10">
            {columns.map((column, index) => {
              const count = tasksByStatus[column.key].length;
              const active = count > 0;
              return (
                <div key={column.key} className="rounded-2xl border border-purple-100 bg-white/90 p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${column.accent} text-white flex items-center justify-center font-bold shadow-md`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">{column.title}</h4>
                      <p className="text-xs text-slate-500">{column.subtitle}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${active ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                    {count} {count === 1 ? 'item' : 'items'}
                  </div>
                  <div className="mt-4 space-y-3">
                    {tasksByStatus[column.key].map((t) => (
                      <TaskCard
                        key={t.id}
                        task={t}
                        isAdmin={isAdmin}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                    {tasksByStatus[column.key].length === 0 && (
                      <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-4 text-sm text-slate-500">
                        Nothing here yet.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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

      {isAdmin && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowTaskModal(true)}
            className="text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            + Add Task
          </Button>
        </div>
      )}

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
