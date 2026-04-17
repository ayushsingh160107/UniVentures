// ========================================
// Home.jsx — Landing page (premium redesign)
// ========================================

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Lightbulb, Rocket, Target, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import StatsBar from '../components/StatsBar';
import { getStartups, DOMAINS } from '../data/mockStartups';

// Hook to detect when elements enter viewport
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

export default function Home() {
  const [startups, setStartups] = useState([]);
  const [trendingRef, trendingVisible] = useInView();
  const [domainsRef, domainsVisible] = useInView();
  const [stepsRef, stepsVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  useEffect(() => {
    setStartups(getStartups());
  }, []);

  const trendingStartups = startups
    .filter(s => s.isTrending)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const steps = [
    { icon: Lightbulb, title: 'Submit Idea', desc: 'Pitch your startup in under 5 minutes with our guided form', color: '#6C63FF' },
    { icon: Users, title: 'Get Feedback', desc: 'Receive votes, comments, and insights from the community', color: '#00B4D8' },
    { icon: Target, title: 'Build Team', desc: 'Find developers, designers, and marketers to join your vision', color: '#F59E0B' },
    { icon: Rocket, title: 'Launch', desc: 'Take your idea from concept to reality with your dream team', color: '#10B981' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EEEAFF] via-[#F4F2FF] to-white" />
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Animated blobs */}
        <div className="absolute top-16 -left-20 w-[500px] h-[500px] bg-[#6C63FF] rounded-full blur-[180px] opacity-[0.08] animate-float pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#00B4D8] rounded-full blur-[200px] opacity-[0.06] animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#F59E0B] rounded-full blur-[160px] opacity-[0.04] pointer-events-none" />

        {/* Orbiting decorative dots */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6C63FF]/30 pointer-events-none" style={{ animation: 'orbit 20s linear infinite' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00B4D8]/30 pointer-events-none" style={{ animation: 'orbit 25s linear infinite reverse' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#6C63FF]/10 shadow-sm mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-sm font-medium text-[#6B7280]">The #1 platform for college founders</span>
          </div>

          {/* Heading */}
          <h1 className="font-[Syne] text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 animate-fade-up stagger-1 opacity-0 text-[#1A1A2E] tracking-tight">
            Where{' '}
            <span className="relative inline-block">
              <span className="text-gradient">College Ideas</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8.5C50 2.5 100 2 150 5.5C200 9 250 4 298 7" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6C63FF" />
                    <stop offset="1" stopColor="#00B4D8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            Become Real Startups
          </h1>

          {/* Subtext */}
          <p className="text-[#6B7280] text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up stagger-2 opacity-0 leading-relaxed">
            Pitch your startup, connect with co-founders, and get the votes
            and feedback you need to turn your idea into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up stagger-3 opacity-0">
            <Link to="/explore"
              className="group px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#7B74FF] text-white font-semibold text-sm shadow-lg shadow-[#6C63FF]/25 hover:shadow-xl hover:shadow-[#6C63FF]/35 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 btn-ripple">
              Explore Pitches
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/submit"
              className="group px-8 py-3.5 rounded-2xl border-2 border-[#E2E8F0] text-[#1A1A2E] font-semibold text-sm hover:border-[#6C63FF]/30 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Sparkles size={16} className="text-[#6C63FF]" />
              Submit Your Idea
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up stagger-4 opacity-0 max-w-lg mx-auto">
            <StatsBar stats={[
              { value: startups.length * 40, suffix: '+', label: 'Ideas Pitched' },
              { value: 120, suffix: '+', label: 'Teams Formed' },
              { value: 30, suffix: '+', label: 'Startups Funded' },
            ]} />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ========== TRENDING ========== */}
      <section ref={trendingRef} className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center">
                  <TrendingUp size={16} className="text-[#6C63FF]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">Trending</span>
              </div>
              <h2 className="font-[Syne] text-2xl md:text-3xl font-bold text-[#1A1A2E]">
                Hot Pitches This Week
              </h2>
            </div>
            <Link to="/explore" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#6C63FF] hover:text-[#00B4D8] transition-colors group">
              View All <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 -mx-1 px-1">
            {trendingStartups.map((startup, i) => (
              <div key={startup.id}
                className={`min-w-[310px] max-w-[330px] shrink-0 ${trendingVisible ? 'animate-fade-up opacity-0' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.08}s` }}>
                <StartupCard startup={startup} />
              </div>
            ))}
          </div>

          <Link to="/explore" className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium text-[#6C63FF]">
            View All Pitches <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* ========== DOMAINS ========== */}
      <section ref={domainsRef} className="py-24 bg-[#FAFBFF] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-[Syne] text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">Explore by Domain</h2>
            <p className="text-[#6B7280] max-w-md mx-auto">Find startups in the space that excites you most</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DOMAINS.map((domain, i) => (
              <Link key={domain.name} to={`/explore?domain=${encodeURIComponent(domain.name)}`}
                className={`group relative p-6 rounded-2xl bg-white border border-gray-100/80 text-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/40 overflow-hidden ${domainsVisible ? 'animate-fade-up opacity-0' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.06}s` }}>
                {/* Background glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-400 rounded-2xl"
                  style={{ background: `radial-gradient(circle at center, ${domain.color}, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-xs font-bold font-mono text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 shadow-lg"
                    style={{ backgroundColor: domain.color, boxShadow: `0 8px 24px ${domain.color}30` }}>
                    {domain.icon}
                  </div>
                  <span className="text-sm font-semibold text-[#4B5563] group-hover:text-[#1A1A2E] transition-colors duration-300">
                    {domain.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section ref={stepsRef} className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[Syne] text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">How It Works</h2>
            <p className="text-[#6B7280]">From idea to launch in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-px">
              <div className="w-full h-full bg-gradient-to-r from-[#6C63FF]/20 via-[#00B4D8]/20 to-[#10B981]/20" />
            </div>

            {steps.map((step, i) => (
              <div key={i}
                className={`relative text-center group ${stepsVisible ? 'animate-fade-up opacity-0' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto group-hover:border-transparent group-hover:shadow-xl transition-all duration-400"
                    style={{ '--hover-color': step.color }}>
                    <step.icon size={28} style={{ color: step.color }} />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-bold font-mono text-white flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: step.color }}>
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-[Syne] font-bold text-lg mb-2 text-[#1A1A2E]">{step.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section ref={ctaRef} className="py-24 bg-[#FAFBFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative rounded-3xl overflow-hidden p-10 md:p-16 text-center ${ctaVisible ? 'animate-scale-in opacity-0' : 'opacity-0'}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF] via-[#7B74FF] to-[#00B4D8]" />
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[120px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00B4D8] rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
                <Zap size={32} className="text-white" />
              </div>
              <h2 className="font-[Syne] text-2xl md:text-4xl font-bold mb-4 text-white tracking-tight">
                Ready to Pitch Your Big Idea?
              </h2>
              <p className="text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
                Join hundreds of college founders who've already shared their vision. Your next co-founder might be waiting.
              </p>
              <Link to="/submit"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white text-[#6C63FF] font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 btn-ripple">
                <Rocket size={18} /> Submit Your Pitch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
