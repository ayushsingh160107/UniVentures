// ========================================
// Signup.jsx — Premium signup with role selection
// ========================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, Eye, EyeOff, Mail, Lock, User, GraduationCap, TrendingUp, Lightbulb, DollarSign, Users, Target } from 'lucide-react';
import { generateId } from '../utils/helpers';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = role selection, 2 = form
  const [role, setRole] = useState(''); // 'student' or 'investor'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    bio: '',
    // Investor-specific
    firm: '',
    investmentRange: '',
    interests: [],
  });

  function updateField(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  }

  function selectRole(r) {
    setRole(r);
    setStep(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newUser = {
        id: generateId(),
        name: form.name,
        email: form.email,
        password: form.password,
        role: role === 'student' ? 'Entrepreneur' : 'Investor',
        userType: role,
        college: form.college,
        bio: form.bio || (role === 'student' ? 'Aspiring entrepreneur ready to build something amazing.' : 'Looking for the next big idea to invest in.'),
        firm: form.firm,
        investmentRange: form.investmentRange,
        interests: form.interests,
        savedStartups: [],
        votedStartups: [],
        github: '',
        linkedin: '',
        twitter: '',
      };

      // Save to all users list
      const users = JSON.parse(localStorage.getItem('uv_all_users') || '[]');
      users.push(newUser);
      localStorage.setItem('uv_all_users', JSON.stringify(users));

      // Set as current user
      localStorage.setItem('uv_user', JSON.stringify(newUser));
      localStorage.setItem('uv_auth', JSON.stringify({ loggedIn: true, userId: newUser.id, role: role }));

      navigate(role === 'investor' ? '/dashboard' : '/explore');
      setLoading(false);
    }, 800);
  }

  const DOMAINS = ['AI/ML', 'FinTech', 'HealthTech', 'EdTech', 'E-Commerce', 'CleanTech'];

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
              {role === 'investor' ? 'Discover the next\nbig thing.' : 'Turn your idea\ninto reality.'}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              {role === 'investor'
                ? 'Connect with talented college founders and find promising startups to back.'
                : 'Join a community of college founders who are building the future, together.'
              }
            </p>
          </div>

          <div className="space-y-4">
            {role === 'student' ? (
              <div className="space-y-3">
                {[
                  { icon: Lightbulb, text: 'Pitch your startup idea' },
                  { icon: Users, text: 'Find co-founders and team members' },
                  { icon: Target, text: 'Get feedback from the community' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <item.icon size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            ) : role === 'investor' ? (
              <div className="space-y-3">
                {[
                  { icon: TrendingUp, text: 'Browse trending startup pitches' },
                  { icon: DollarSign, text: 'Connect directly with founders' },
                  { icon: Target, text: 'Track portfolios and watchlists' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <item.icon size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/50 text-sm">Choose your role to get started →</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F8FAFF] overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00B4D8] flex items-center justify-center">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="font-[Syne] text-xl font-bold text-gradient">UniVenture</span>
          </Link>

          {/* STEP 1: Role Selection */}
          {step === 1 && (
            <div className="animate-fade-up">
              <div className="mb-8 text-center">
                <h2 className="font-[Syne] text-2xl font-bold text-[#1A1A2E] mb-2">Join UniVenture</h2>
                <p className="text-[#9CA3AF]">Choose how you want to participate</p>
              </div>

              <div className="space-y-4">
                {/* Student Card */}
                <button
                  onClick={() => selectRole('student')}
                  className="group w-full text-left p-6 rounded-2xl bg-white border-2 border-gray-100/80 hover:border-[#6C63FF]/30 hover:shadow-xl hover:shadow-[#6C63FF]/5 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C63FF]/10 to-[#00B4D8]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <GraduationCap size={26} className="text-[#6C63FF]" />
                    </div>
                    <div>
                      <h3 className="font-[Syne] text-lg font-bold text-[#1A1A2E] mb-1 flex items-center gap-2">
                        I'm a Student
                        <ArrowRight size={16} className="text-[#9CA3AF] group-hover:text-[#6C63FF] group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        Pitch your startup idea, find co-founders, build your team, and get community feedback.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {['Pitch Ideas', 'Find Team', 'Get Votes'].map(tag => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#6C63FF]/[0.06] text-[#6C63FF]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Investor Card */}
                <button
                  onClick={() => selectRole('investor')}
                  className="group w-full text-left p-6 rounded-2xl bg-white border-2 border-gray-100/80 hover:border-[#F59E0B]/30 hover:shadow-xl hover:shadow-[#F59E0B]/5 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#FFD700]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <TrendingUp size={26} className="text-[#F59E0B]" />
                    </div>
                    <div>
                      <h3 className="font-[Syne] text-lg font-bold text-[#1A1A2E] mb-1 flex items-center gap-2">
                        I'm an Investor
                        <ArrowRight size={16} className="text-[#9CA3AF] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        Discover promising startups, connect with founders, and track your investment interests.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {['Discover', 'Connect', 'Invest'].map(tag => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#F59E0B]/[0.06] text-[#F59E0B]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-center text-sm text-[#9CA3AF] mt-8">
                Already have an account?{' '}
                <Link to="/login" className="text-[#6C63FF] font-medium hover:underline">Sign in</Link>
              </p>
            </div>
          )}

          {/* STEP 2: Registration Form */}
          {step === 2 && (
            <div className="animate-fade-up">
              <button
                onClick={() => { setStep(1); setRole(''); }}
                className="text-sm text-[#9CA3AF] hover:text-[#6B7280] mb-6 flex items-center gap-1 transition-colors"
              >
                ← Change role
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    role === 'student'
                      ? 'bg-[#6C63FF]/10 text-[#6C63FF]'
                      : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                  }`}>
                    {role === 'student' ? 'Student / Founder' : 'Investor'}
                  </span>
                </div>
                <h2 className="font-[Syne] text-2xl font-bold text-[#1A1A2E] mb-1">Create your account</h2>
                <p className="text-[#9CA3AF] text-sm">Fill in the details to get started</p>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/15 text-sm text-[#EF4444]">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Full Name <span className="text-[#EF4444]">*</span></label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      value={form.name}
                      onChange={e => updateField('name', e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Email <span className="text-[#EF4444]">*</span></label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Password <span className="text-[#EF4444]">*</span></label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => updateField('password', e.target.value)}
                      placeholder="At least 6 characters"
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

                {/* Student-specific fields */}
                {role === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">College / University</label>
                    <div className="relative">
                      <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                      <input
                        value={form.college}
                        onChange={e => updateField('college', e.target.value)}
                        placeholder="e.g., IIT Delhi"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Investor-specific fields */}
                {role === 'investor' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Firm / Organization</label>
                      <input
                        value={form.firm}
                        onChange={e => updateField('firm', e.target.value)}
                        placeholder="e.g., Sequoia Capital (or Individual)"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Investment Range</label>
                      <select
                        value={form.investmentRange}
                        onChange={e => updateField('investmentRange', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#6C63FF]/40 appearance-none cursor-pointer transition-all"
                      >
                        <option value="">Select range</option>
                        <option value="<5L">Under ₹5 Lakh</option>
                        <option value="5-25L">₹5 - 25 Lakh</option>
                        <option value="25-1Cr">₹25 Lakh - 1 Crore</option>
                        <option value="1Cr+">₹1 Crore+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Interested Domains</label>
                      <div className="grid grid-cols-3 gap-2">
                        {DOMAINS.map(domain => (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => {
                              const current = form.interests;
                              updateField('interests', current.includes(domain) ? current.filter(d => d !== domain) : [...current, domain]);
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                              form.interests.includes(domain)
                                ? 'bg-[#6C63FF]/[0.06] text-[#6C63FF] border-[#6C63FF]/20'
                                : 'bg-gray-50 text-[#6B7280] border-gray-200/60 hover:border-gray-300'
                            }`}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Short Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={e => updateField('bio', e.target.value)}
                    rows={2}
                    placeholder={role === 'student' ? 'Tell us about yourself and what you\'re building...' : 'Tell us about your investment interests...'}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 btn-ripple disabled:opacity-60 disabled:cursor-not-allowed mt-2 ${
                    role === 'investor'
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#FFB800] shadow-[#F59E0B]/20 hover:shadow-[#F59E0B]/30'
                      : 'bg-gradient-to-r from-[#6C63FF] to-[#7B74FF] shadow-[#6C63FF]/20 hover:shadow-[#6C63FF]/30'
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Create Account <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-[#9CA3AF] mt-6">
                By signing up, you agree to our{' '}
                <a href="#" className="text-[#6C63FF] hover:underline">Terms</a> and{' '}
                <a href="#" className="text-[#6C63FF] hover:underline">Privacy Policy</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
