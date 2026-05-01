import React from 'react';
import { format } from 'date-fns';

type Props = {
  task: any;
  isAdmin?: boolean;
  onClick?: (task: any) => void;
  onStatusChange?: (taskId: string, status: 'todo' | 'in_progress' | 'review' | 'done') => void;
};

const priorityClasses: Record<string, string> = {
  critical: 'border-l-4 border-red-500 bg-red-50/30',
  high: 'border-l-4 border-orange-500 bg-orange-50/30',
  medium: 'border-l-4 border-blue-500 bg-blue-50/30',
  low: 'border-l-4 border-purple-300 bg-purple-50/30',
};

const statusBadge: Record<string, string> = {
  todo: 'bg-slate-100 text-slate-700 font-medium',
  in_progress: 'bg-blue-100 text-blue-700 font-medium',
  review: 'bg-purple-100 text-purple-700 font-medium',
  done: 'bg-green-100 text-green-700 font-medium',
};

const statusOptions: Array<{ value: 'todo' | 'in_progress' | 'review' | 'done'; label: string }> = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
];

const TaskCard: React.FC<Props> = ({ task, isAdmin = false, onClick, onStatusChange }) => {
  return (
    <div onClick={() => onClick && onClick(task)} className={`card p-3 cursor-pointer hover:shadow-md transition border border-purple-200/20 ${priorityClasses[task.priority] || ''}`}>
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <div className="font-bold text-blue-900 text-sm">{task.title}</div>
          <div className="text-xs text-purple-600 mt-1">{task.description}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`px-2 py-1 rounded text-xs ${statusBadge[task.status] || ''}`}>{task.status.replace('_', ' ')}</div>
          <div className="text-xs text-purple-500 mt-1">{task.assignee?.name || 'Unassigned'}</div>
          {task.dueDate && <div className="text-xs text-purple-400 mt-1">Due {format(new Date(task.dueDate), 'MMM d')}</div>}
        </div>
      </div>

      {isAdmin && onStatusChange && (
        <div className="mt-3 pt-3 border-t border-purple-100" onClick={(e) => e.stopPropagation()}>
          <label className="block text-xs font-semibold text-purple-700 mb-1">Update status</label>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as 'todo' | 'in_progress' | 'review' | 'done')}
            className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm text-slate-700"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
