import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/UI/StatCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/dashboard/${user?.role === 'admin' ? 'admin' : 'member'}`);
        setStats(res.data);
      } catch (err) {
        // ignore
      }
    };
    fetch();
  }, [user]);

  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard title={isAdmin ? 'Total Projects' : 'My Tasks'} value={stats?.totalProjects ?? stats?.myTasks ?? 0} />
        <StatCard title={isAdmin ? 'Total Tasks' : 'Completed'} value={stats?.totalTasks ?? stats?.completed ?? 0} />
        <StatCard title="Completed" value={stats?.completedTasks ?? stats?.completed ?? 0} />
        <StatCard title="Overdue" value={stats?.overdue ?? 0} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-bold mb-2">Tasks by status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={[{name:'todo', value:10},{name:'in_progress', value:5},{name:'done', value:8}]} dataKey="value" nameKey="name" outerRadius={60}>
                <Cell fill="#8884d8" />
                <Cell fill="#82ca9d" />
                <Cell fill="#ffc658" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <h3 className="font-bold mb-2">Tasks by priority</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[{name:'low', value:5},{name:'medium', value:8},{name:'high', value:7},{name:'critical', value:2}]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
