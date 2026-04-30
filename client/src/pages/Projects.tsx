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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
        {user?.role === 'admin' && (
          <Button onClick={() => setShowModal(true)}>New Project</Button>
        )}
      </div>

      {loading ? (
        <div>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-slate-600">No projects yet</div>
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
