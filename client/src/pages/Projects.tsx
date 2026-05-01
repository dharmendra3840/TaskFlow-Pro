import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import projectService from '../services/projectService';
import ProjectCard from '../components/Projects/ProjectCard';
import ProjectForm from '../components/Projects/ProjectForm';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';

const Projects: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await projectService.fetchProjects();
      setProjects(res.data);
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleSaved = async (project: any) => {
    setShowModal(false);
    await fetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-purple-500 font-semibold">Workspace</p>
          <h2 className="text-3xl font-bold text-blue-900">Projects</h2>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setShowModal(true)}>+ New Project</Button>
        )}
      </div>

      {loading ? (
        <div>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="card p-8 border border-purple-200/60 bg-white/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-2">No projects yet</h3>
          <p className="text-slate-600 mb-4">
            {user?.role === 'admin'
              ? 'Create the first project and assign it to your clients or team members.'
              : 'You will see projects here once an admin assigns them to you.'}
          </p>
          {user?.role === 'admin' && (
            <Button onClick={() => setShowModal(true)}>Create your first project</Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} taskCount={p.tasks?.length || 0} />
          ))}
        </div>
      )}

      <Modal isOpen={showModal} title="New Project" onClose={() => setShowModal(false)}>
        <ProjectForm onSaved={handleSaved} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default Projects;
