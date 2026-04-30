import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    if (location.pathname === '/app') return 'Dashboard';
    if (location.pathname === '/app/projects') return 'Projects';
    if (location.pathname.startsWith('/app/projects/')) return 'Project Details';
    if (location.pathname === '/app/tasks') return 'Tasks';
    return 'Dashboard';
  };

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-900">{getPageTitle()}</h1>
      <div className="text-sm text-purple-600">Welcome back</div>
    </header>
  );
};

export default Header;
