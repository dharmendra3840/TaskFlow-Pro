import React, { useEffect, useState } from 'react';
import taskService from '../../services/taskService';
import TaskCard from './TaskCard';

type Props = { projectId?: string };

const TaskList: React.FC<Props> = ({ projectId }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetch = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await taskService.fetchTasks({ projectId });
      setTasks(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load tasks');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [projectId]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-2">
      {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      {tasks.length === 0 && <div className="text-slate-600">No tasks</div>}
    </div>
  );
};

export default TaskList;
