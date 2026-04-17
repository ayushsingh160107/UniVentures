// ========================================
// Login.jsx — Premium login page
// ========================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Simulate login (check localStorage for user)
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('uv_all_users') || '[]');
      const found = users.find(u => u.email === email);

      if (found && found.password === password) {
        localStorage.setItem('uv_auth', JSON.stringify({ loggedIn: true, userId: found.id, role: found.role }));
        localStorage.setItem('uv_user', JSON.stringify(found));
        navigate(found.role === 'investor' ? '/dashboard' : '/explore');
      } else {
        // For demo: auto-login the default user
        const defaultUser = JSON.parse(localStorage.getItem('uv_user'));
        if (defaultUser && email === defaultUser.email) {
          localStorage.setItem('uv_auth', JSON.stringify({ loggedIn: true, userId: defaultUser.id, role: 'student' }));
          navigate('/explore');
        } else {
          setError('Invalid email or password. Try signing up first!');
        }
      }
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF] via-[#7B74FF] to-[#00B4D8]" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-20 -left-10 w-64 h-64 bg-white rounded-full blur-[120px] opacity-10" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00B4D8] rounded-full blur-[150px] opacity-15" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Rocket size={20} className="text-white" />
            </div>
            <span className="font-[Syne] text-2xl font-bold text-white">UniVenture</span>
          </Link>

          <div>
            <h1 className="font-[Syne] text-4xl font-bold text-white leading-tight mb-4">
              Welcome back,<br />change-maker.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              Log in to continue pitching ideas, discovering startups, and building your dream team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['PS', 'AK', 'KN', 'SR'].map((initials, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm">500+ founders already on board</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F8FAFF]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00B4D8] flex items-center justify-center">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="font-[Syne] text-xl font-bold text-gradient">UniVenture</span>
          </Link>

          <div className="mb-8">
            <h2 className="font-[Syne] text-2xl font-bold text-[#1A1A2E] mb-2">Sign in to your account</h2>
            <p className="text-[#9CA3AF]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#6C63FF] font-medium hover:underline">Sign up free</Link>
            </p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/15 text-sm text-[#EF4444]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#6C63FF] focus:ring-[#6C63FF]/20" />
                <span className="text-sm text-[#6B7280]">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#6C63FF] hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#7B74FF] text-white font-semibold text-sm shadow-lg shadow-[#6C63FF]/20 hover:shadow-xl hover:shadow-[#6C63FF]/30 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 btn-ripple disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F8FAFF] px-4 text-xs text-[#9CA3AF]">or continue with</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200/80 text-sm font-medium text-[#1A1A2E] hover:bg-gray-50 hover:shadow-sm transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200/80 text-sm font-medium text-[#1A1A2E] hover:bg-gray-50 hover:shadow-sm transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
