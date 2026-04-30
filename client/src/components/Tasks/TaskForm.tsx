import React, { useEffect, useState } from 'react';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';

type Props = {
  projectId?: string;
  initial?: any;
  onSaved?: (task: any) => void;
  onCancel?: () => void;
};

const TaskForm: React.FC<Props> = ({ projectId, initial, onSaved, onCancel }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priority, setPriority] = useState(initial?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial.dueDate.split('T')[0] : '');
  const [assignedTo, setAssignedTo] = useState(initial?.assignedTo || '');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { projectService.fetchProjects().then(r=>setProjects(r.data)).catch(()=>{}); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title || title.length < 3) return setError('Title required (3+ characters)');
    setLoading(true);
    try {
      const payload = { title, description, priority, dueDate: dueDate || null, projectId: projectId || initial?.projectId, assignedTo: assignedTo || null };
      const res = initial ? await taskService.updateTask(initial.id, payload) : await taskService.createTask(payload);
      onSaved && onSaved(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="text-sm text-slate-600">Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="text-sm text-slate-600">Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-sm text-slate-600">Priority</label>
          <select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full p-2 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-600">Due Date</label>
          <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="text-sm text-slate-600">Project</label>
          <select value={projectId || initial?.projectId || ''} disabled className="w-full p-2 border rounded">
            <option value={projectId || initial?.projectId || ''}>{projects.find(p=>p.id === (projectId || initial?.projectId))?.name || 'Selected project'}</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-3 py-1 rounded border">Cancel</button>
        <button type="submit" className="px-3 py-1 rounded bg-primary text-white" disabled={loading}>{loading? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
};

export default TaskForm;
