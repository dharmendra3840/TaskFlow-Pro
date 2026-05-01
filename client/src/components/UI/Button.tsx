import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
};

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2',
  lg: 'px-4 py-3 text-lg',
};

const variantClasses: Record<string, string> = {
  primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg hover:scale-[1.01]',
  secondary: 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`rounded-lg font-semibold transition duration-200 ${sizeClasses[size]} ${variantClasses[variant]} disabled:opacity-50 disabled:shadow-none`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
