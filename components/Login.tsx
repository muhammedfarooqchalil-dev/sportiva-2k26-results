import React, { useState } from 'react';
import { loginAdmin } from '../services/dataService';
import { Lock } from 'lucide-react';
import { isFirebaseConfigured } from '../firebaseConfig';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const success = await loginAdmin(email, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-slate-100 p-3 rounded-full mb-4">
          <Lock className="h-8 w-8 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Admin Access</h2>
        <p className="text-slate-500 text-sm mt-1">
          {isFirebaseConfigured() 
            ? "Sign in with your authorized account" 
            : "Demo Mode: Use 'admin@college.com' & 'admin123'"}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@college.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input 
            type="password" 
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg active:scale-[0.98]"
        >
          {loading ? 'Verifying...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};