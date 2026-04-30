import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState<'admin'|'member'>('member');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    try {
      const res = await authService.register({ name, email, password, role });
      login(res.data.token, res.data.user);
      navigate('/app');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md card p-6">
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm text-slate-600">Name</label>
          <input className="w-full p-2 border rounded mb-4" value={name} onChange={e=>setName(e.target.value)} />
          <label className="block mb-2 text-sm text-slate-600">Email</label>
          <input className="w-full p-2 border rounded mb-4" value={email} onChange={e=>setEmail(e.target.value)} />
          <label className="block mb-2 text-sm text-slate-600">Password</label>
          <input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={e=>setPassword(e.target.value)} />
          <label className="block mb-2 text-sm text-slate-600">Confirm Password</label>
          <input type="password" className="w-full p-2 border rounded mb-4" value={confirm} onChange={e=>setConfirm(e.target.value)} />
          <label className="block mb-2 text-sm text-slate-600">Role</label>
          <select className="w-full p-2 border rounded mb-4" value={role} onChange={e=>setRole(e.target.value as any)}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-primary text-white p-2 rounded" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
