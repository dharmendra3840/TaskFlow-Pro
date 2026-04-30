import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

type Props = {
  project: any;
  taskCount?: number;
};

const statusBadge: Record<string, string> = {
  active: 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  'on-hold': 'bg-amber-100 text-amber-600',
};

const ProjectCard: React.FC<Props> = ({ project, taskCount = 0 }) => {
  const progress = taskCount > 0 ? 65 : 0;
  return (
    <Link to={`/app/projects/${project.id}`}>
      <div className="card p-4 hover:shadow-md transition">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-800">{project.name}</h3>
          <div className={`px-2 py-1 rounded text-sm ${statusBadge[project.status] || ''}`}>{project.status}</div>
        </div>
        <p className="text-sm text-slate-600 mb-3">{project.description || 'No description'}</p>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div className="bg-primary h-2 rounded" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>{taskCount} tasks</span>
          {project.deadline && <span>Due {format(new Date(project.deadline), 'MMM d')}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
