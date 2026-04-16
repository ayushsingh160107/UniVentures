// ========================================
// Home.jsx — Landing page (light theme)
// ========================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Lightbulb, Rocket, Target, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import StatsBar from '../components/StatsBar';
import { getStartups, DOMAINS } from '../data/mockStartups';

export default function Home() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    setStartups(getStartups());
  }, []);

  const trendingStartups = startups
    .filter(s => s.isTrending)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const steps = [
    { icon: Lightbulb, title: 'Submit Idea', desc: 'Pitch your startup in under 5 minutes with our guided form' },
    { icon: Users, title: 'Get Feedback', desc: 'Receive votes, comments, and insights from the community' },
    { icon: Target, title: 'Build Team', desc: 'Find developers, designers, and marketers to join your vision' },
    { icon: Rocket, title: 'Launch', desc: 'Take your idea from concept to reality with your dream team' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ════════ HERO SECTION ════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-[#F0F0FF] via-[#F8FAFF] to-white">
        <div className="absolute inset-0 grid-pattern opacity-60" />

        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6C63FF] rounded-full blur-[120px] opacity-15 animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00B4D8] rounded-full blur-[150px] opacity-10 animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-fade-up">
            <Sparkles size={14} className="text-[#F59E0B]" />
            <span className="text-sm text-[#6B7280]">The #1 platform for college founders</span>
          </div>

          <h1 className="font-[Syne] text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-up stagger-1 opacity-0 text-[#1A1A2E]">
            Where{' '}
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] bg-clip-text text-transparent">
              College Ideas
            </span>
            <br />
            Become Real Startups
          </h1>

          <p className="text-[#6B7280] text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up stagger-2 opacity-0">
            Pitch your startup, connect with co-founders, and get the votes
            and feedback you need to turn your idea into reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-up stagger-3 opacity-0">
            <Link
              to="/explore"
              className="group px-8 py-3.5 rounded-xl bg-[#6C63FF] text-white font-semibold text-sm shadow-lg shadow-[#6C63FF]/30 hover:shadow-xl hover:shadow-[#6C63FF]/40 transition-all duration-300 flex items-center gap-2"
            >
              Explore Pitches
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/submit"
              className="px-8 py-3.5 rounded-xl border-2 border-[#00B4D8]/50 text-[#00B4D8] font-semibold text-sm hover:bg-[#00B4D8]/5 transition-all duration-300"
            >
              Submit Your Idea
            </Link>
          </div>

          <div className="animate-fade-up stagger-4 opacity-0">
            <StatsBar stats={[
              { value: startups.length * 40, suffix: '+', label: 'Ideas Pitched' },
              { value: 120, suffix: '+', label: 'Teams Formed' },
              { value: 30, suffix: '+', label: 'Startups Funded' },
            ]} />
          </div>
        </div>
      </section>

      {/* ════════ TRENDING SECTION ════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-[Syne] text-2xl md:text-3xl font-bold text-[#1A1A2E] flex items-center gap-2">
              🔥 Trending This Week
            </h2>
            <Link to="/explore" className="text-sm text-[#6C63FF] hover:text-[#00B4D8] transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-4">
            {trendingStartups.map((startup, i) => (
              <div key={startup.id} className={`min-w-[320px] max-w-[340px] animate-fade-up opacity-0 stagger-${i + 1}`}>
                <StartupCard startup={startup} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DOMAIN CATEGORIES ════════ */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[Syne] text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">Explore by Domain</h2>
            <p className="text-[#6B7280]">Find startups in the space that excites you</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DOMAINS.map(domain => (
              <Link
                key={domain.name}
                to={`/explore?domain=${encodeURIComponent(domain.name)}`}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                  style={{ backgroundColor: domain.color }}
                />
                <div className="relative z-10">
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                    {domain.emoji}
                  </span>
                  <span className="text-sm font-medium text-[#6B7280] group-hover:text-[#1A1A2E] transition-colors">
                    {domain.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[Syne] text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">How It Works</h2>
            <p className="text-[#6B7280]">From idea to launch in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#6C63FF] via-[#00B4D8] to-[#6C63FF] opacity-20" />

            {steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-20 h-20 rounded-2xl bg-[#F8FAFF] border border-gray-200 flex items-center justify-center mx-auto mb-5 group-hover:border-[#6C63FF]/30 group-hover:shadow-lg group-hover:shadow-[#6C63FF]/10 transition-all duration-300">
                  <step.icon size={28} className="text-[#6C63FF]" />
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#6C63FF]/5 text-[#6C63FF] mb-3">
                  Step {i + 1}
                </span>

                <h3 className="font-[Syne] font-semibold text-lg mb-2 text-[#1A1A2E]">{step.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA BANNER ════════ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center bg-gradient-to-br from-[#6C63FF] to-[#00B4D8]">
            <div className="absolute inset-0 grid-pattern opacity-10" />

            <div className="relative z-10">
              <Zap size={40} className="text-[#FFE066] mx-auto mb-6" />
              <h2 className="font-[Syne] text-2xl md:text-4xl font-bold mb-4 text-white">
                Ready to Pitch Your Big Idea?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join hundreds of college founders who've already shared their vision. Your next co-founder might be waiting.
              </p>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#6C63FF] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Rocket size={18} />
                Submit Your Pitch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
