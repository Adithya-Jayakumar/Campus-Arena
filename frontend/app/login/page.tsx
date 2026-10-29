'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Shield, GraduationCap, Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { fetchREST } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent, customCreds?: { email: string; pass: string }) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    const loginEmail = customCreds ? customCreds.email : email;
    const loginPassword = customCreds ? customCreds.pass : password;

    try {
      const data = await fetchREST('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      localStorage.setItem('arena_token', data.accessToken);
      localStorage.setItem('arena_user', JSON.stringify(data.user));

      if (data.user.role === 'ADMIN') {
        router.push('/admin');
        window.location.href = '/admin';
      } else {
        router.push('/events');
        window.location.href = '/events';
      }
    } catch {
      // Offline fallback
      const isAdmin = loginEmail.includes('admin');
      const mockUser = {
        id: isAdmin ? 'user-admin-1' : 'user-student-1',
        name: isAdmin ? 'Dr. Jaison (Sports Director)' : 'Adithya S.',
        email: loginEmail,
        role: isAdmin ? 'ADMIN' : 'STUDENT',
        department: 'Computer Science & Engineering',
        studentId: isAdmin ? 'ADMIN-01' : 'SHR21CS045',
      };

      localStorage.setItem('arena_token', 'mock_token');
      localStorage.setItem('arena_user', JSON.stringify(mockUser));

      if (isAdmin) {
        router.push('/admin');
        window.location.href = '/admin';
      } else {
        router.push('/events');
        window.location.href = '/events';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: 'STUDENT' | 'ADMIN') => {
    if (role === 'STUDENT') {
      setEmail('student@campusarena.edu');
      setPassword('student123');
      handleLogin(undefined, { email: 'student@campusarena.edu', pass: 'student123' });
    } else {
      setEmail('admin@campusarena.edu');
      setPassword('admin123');
      handleLogin(undefined, { email: 'admin@campusarena.edu', pass: 'admin123' });
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header with College Logo - Blended Seamlessly */}
        <div className="text-center space-y-3">
          <div className="relative h-16 w-64 mx-auto flex items-center justify-center">
            <Image
              src="/images/sahrdaya-logo-blend.png"
              alt="Sahrdaya Logo"
              fill
              className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Campus Arena Login</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your role to access event registrations or tournament management
            </p>
          </div>
        </div>

        {/* 2-Role One-Click Quick Sign In */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              ⚡ Instant 1-Click Login
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Student & Admin</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin('STUDENT')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/80 text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-white">Student Login</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Enroll in tournaments</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('ADMIN')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-white">Admin Login</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Control events & scores</p>
            </button>
          </div>
        </div>

        {/* Manual Credentials Form */}
        <form onSubmit={(e) => handleLogin(e)} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              College Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="student@campusarena.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
