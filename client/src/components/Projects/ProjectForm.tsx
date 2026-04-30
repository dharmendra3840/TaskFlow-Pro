import React, { useState } from 'react';
import projectService from '../../services/projectService';

type Props = {
  initial?: any;
  onSaved?: (project: any) => void;
  onCancel?: () => void;
};

const ProjectForm: React.FC<Props> = ({ initial, onSaved, onCancel }) => {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [deadline, setDeadline] = useState(initial?.deadline ? initial.deadline.split('T')[0] : '');
  const [status, setStatus] = useState(initial?.status || 'active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || name.length < 3) return setError('Name required (3+ characters)');
    setLoading(true);
    try {
      const payload = { 
        name, 
        description, 
        deadline: deadline || null, 
        status: status.toLowerCase() 
      };
      const res = initial
        ? await projectService.updateProject(initial.id, payload)
        : await projectService.createProject(payload);
      onSaved && onSaved(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="text-sm text-slate-600">Project Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter project name"
        />
      </div>
      <div>
        <label className="text-sm text-slate-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Project description"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-slate-600">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm text-slate-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 rounded bg-primary text-white"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
