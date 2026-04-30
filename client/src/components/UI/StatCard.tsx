import React from 'react';

type Props = {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
};

const StatCard: React.FC<Props> = ({ title, value, description, icon }) => {
  return (
    <div className="card p-4 border border-purple-200/30 hover:shadow-lg hover:border-purple-300/50 transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-purple-600">{title}</div>
          <div className="text-3xl font-bold text-blue-900 mt-2">{value}</div>
          {description && <div className="text-sm text-purple-500 mt-1">{description}</div>}
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
