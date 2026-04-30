import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login({ email, password });
      login(res.data.token, res.data.user);
      navigate('/app');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md card p-6">
        <h2 className="text-2xl font-bold mb-4">Sign in to TaskFlow Pro</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm text-slate-600">Email</label>
          <input className="w-full p-2 border rounded mb-4" value={email} onChange={e => setEmail(e.target.value)} />
          <label className="block mb-2 text-sm text-slate-600">Password</label>
          <input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-primary text-white p-2 rounded" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <div className="mt-4 text-sm text-slate-600">Don't have an account? <Link to="/register" className="text-primary">Register</Link></div>
      </div>
    </div>
  );
};

export default Login;
