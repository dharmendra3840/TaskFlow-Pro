import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import userService from '../../services/userService';

type Props = {
  initial?: any;
  onSaved?: (project: any) => void;
  onCancel?: () => void;
};

const ProjectForm: React.FC<Props> = ({ initial, onSaved, onCancel }) => {
  const { user } = useAuth();
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [deadline, setDeadline] = useState(initial?.deadline ? initial.deadline.split('T')[0] : '');
  const [status, setStatus] = useState(initial?.status || 'active');
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>(
    initial?.members?.map((member: any) => member.id) || []
  );
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [error, setError] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) return;

    const loadClients = async () => {
      setLoadingClients(true);
      try {
        const res = await userService.fetchUsers({ role: 'member' });
        setClients(res.data);
      } catch (err) {
        setClients([]);
      } finally {
        setLoadingClients(false);
      }
    };

    loadClients();
  }, [isAdmin]);

  useEffect(() => {
    if (initial?.members) {
      setSelectedClientIds(initial.members.map((member: any) => member.id));
    }
  }, [initial]);

  const clientOptions = useMemo(() => clients, [clients]);

  const syncMembers = async (projectId: string) => {
    if (!isAdmin) return;

    const existingIds = new Set((initial?.members || []).map((member: any) => member.id));
    const selectedIds = new Set(selectedClientIds);

    const addPromises = selectedClientIds
      .filter((clientId) => !existingIds.has(clientId))
      .map((clientId) => projectService.addMember(projectId, clientId));

    const removePromises = (initial?.members || [])
      .map((member: any) => member.id)
      .filter((clientId: string) => !selectedIds.has(clientId))
      .map((clientId: string) => projectService.removeMember(projectId, clientId));

    await Promise.all([...addPromises, ...removePromises]);
  };

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

      const projectId = initial?.id || res.data.id;
      await syncMembers(projectId);
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

      {isAdmin && (
        <div>
          <label className="text-sm text-slate-600">Assign Clients</label>
          <div className="mt-1 max-h-28 overflow-y-auto rounded-lg border border-purple-200 bg-white p-3 space-y-2">
            {loadingClients ? (
              <div className="text-sm text-slate-500">Loading clients...</div>
            ) : clientOptions.length > 0 ? (
              clientOptions.map((client) => {
                const checked = selectedClientIds.includes(client.id);
                return (
                  <label key={client.id} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        setSelectedClientIds((current) =>
                          e.target.checked
                            ? [...current, client.id]
                            : current.filter((clientId) => clientId !== client.id)
                        );
                      }}
                      className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span>
                      {client.name}
                      {client.email ? <span className="text-slate-400"> ({client.email})</span> : null}
                    </span>
                  </label>
                );
              })
            ) : (
              <div className="text-sm text-slate-500">No clients found</div>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500">Select one or more clients to assign them to this project.</p>
        </div>
      )}

      <div className="flex gap-2 justify-end sticky bottom-0 bg-white pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-purple-200 text-purple-700 bg-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
