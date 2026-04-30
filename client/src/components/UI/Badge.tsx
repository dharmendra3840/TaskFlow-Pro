import React from 'react';

type Props = {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
};

const variantClasses: Record<string, string> = {
  primary: 'bg-indigo-100 text-indigo-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
};

const Badge: React.FC<Props> = ({ text, variant = 'primary' }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${variantClasses[variant]}`}>
      {text}
    </span>
  );
};

export default Badge;
