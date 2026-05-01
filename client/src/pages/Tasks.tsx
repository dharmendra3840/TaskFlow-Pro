import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/taskService';
import TaskCard from '../components/Tasks/TaskCard';

const Tasks: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const fetch = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const res = await taskService.fetchTasks(params);
      setTasks(res.data);
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [statusFilter, priorityFilter]);

  const handleStatusChange = async (taskId: string, status: 'todo' | 'in_progress' | 'review' | 'done') => {
    if (user?.role !== 'admin') return;
    await taskService.updateTask(taskId, { status });
    await fetch();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Tasks</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {loading ? (
        <div>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-slate-600">No tasks</div>
      ) : (
        <div className="grid gap-3">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} isAdmin={user?.role === 'admin'} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
