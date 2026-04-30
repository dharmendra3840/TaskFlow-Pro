import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #FAF0FF 50%, #FFF0F7 100%)' }}>
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <main className="mt-6"><Outlet /></main>
      </div>
    </div>
  );
};

export default Layout;
