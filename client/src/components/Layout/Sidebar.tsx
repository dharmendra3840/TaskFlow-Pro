import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 p-4" style={{ background: 'linear-gradient(180deg, #0F1A3F 0%, #1A0F3F 100%)', minHeight: '100vh' }}>
      <div className="text-white font-bold text-xl mb-6">TaskFlow Pro</div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/app" end className={({isActive}) => `px-3 py-2 rounded transition ${isActive? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold':'text-purple-200 hover:text-white'}`}>Dashboard</NavLink>
        <NavLink to="/app/projects" className={({isActive}) => `px-3 py-2 rounded transition ${isActive? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold':'text-purple-200 hover:text-white'}`}>Projects</NavLink>
        <NavLink to="/app/tasks" className={({isActive}) => `px-3 py-2 rounded transition ${isActive? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold':'text-purple-200 hover:text-white'}`}>Tasks</NavLink>
      </nav>
      <div className="absolute bottom-6 left-6 right-6 text-white">
        {user && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">{user.name?.[0]}</div>
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm text-purple-200">{user.role}</div>
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="mt-3 text-sm text-purple-300 hover:text-pink-300 transition">Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
