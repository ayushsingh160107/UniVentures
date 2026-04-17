// ========================================
// Profile.jsx — Premium profile page
// ========================================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, Rocket, Heart, Users, Bookmark, ExternalLink, MapPin, GraduationCap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import Avatar from '../components/Avatar';
import { getUser, getStartups } from '../data/mockStartups';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [myPitches, setMyPitches] = useState([]);
  const [savedPitches, setSavedPitches] = useState([]);
  const [activeTab, setActiveTab] = useState('pitches');

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
    const allStartups = getStartups();
    setMyPitches(allStartups.filter(s => s.founders.some(f => f.name === userData.name)));
    setSavedPitches(allStartups.filter(s => (userData.savedStartups || []).includes(s.id)));
  }, [id]);

  if (!user) return (
    <div className="min-h-screen bg-[#F8FAFF]"><Navbar /><div className="max-w-7xl mx-auto px-4 pt-24 text-center"><p className="text-[#6B7280]">Loading...</p></div></div>
  );

  const totalVotes = myPitches.reduce((sum, s) => sum + s.votes, 0);
  const stats = [
    { icon: Rocket, label: 'Pitches', value: myPitches.length, color: '#6C63FF' },
    { icon: Heart, label: 'Votes', value: totalVotes, color: '#EF4444' },
    { icon: Users, label: 'Teams', value: 3, color: '#00B4D8' },
    { icon: Bookmark, label: 'Saved', value: savedPitches.length, color: '#F59E0B' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />

      {/* Cover Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF] via-[#7B74FF] to-[#00B4D8]" />
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute top-10 right-20 w-40 h-40 bg-white rounded-full blur-[100px] opacity-15 pointer-events-none" />
        <div className="absolute bottom-5 left-20 w-48 h-48 bg-[#00B4D8] rounded-full blur-[120px] opacity-15 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="ring-4 ring-white rounded-full shadow-xl">
              <Avatar name={user.name} size="2xl" />
            </div>
            <div className="flex-1 pb-2">
              <h1 className="font-[Syne] text-2xl md:text-3xl font-bold text-[#1A1A2E]">{user.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] text-white shadow-sm">
                  {user.role}
                </span>
                {user.college && (
                  <span className="flex items-center gap-1 text-sm text-[#6B7280]">
                    <GraduationCap size={14} /> {user.college}
                  </span>
                )}
              </div>
            </div>
          </div>

          {user.bio && <p className="text-[#6B7280] mt-4 max-w-2xl leading-relaxed">{user.bio}</p>}

          <div className="flex gap-2 mt-4">
            {[{ url: user.github, label: 'GitHub' }, { url: user.linkedin, label: 'LinkedIn' }, { url: user.twitter, label: 'Twitter' }].map((social, i) => (
              social.url && (
                <a key={i} href={social.url.startsWith('http') ? social.url : `https://${social.url}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#6B7280] bg-white border border-gray-200 hover:text-[#6C63FF] hover:border-[#6C63FF]/30 hover:shadow-sm transition-all">
                  <Globe size={12} /> {social.label} <ExternalLink size={10} />
                </a>
              )
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-100/80 p-5 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: stat.color + '10' }}>
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold font-mono text-[#1A1A2E]">{stat.value}</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-8">
          {[{ id: 'pitches', label: `My Pitches (${myPitches.length})` }, { id: 'saved', label: `Saved (${savedPitches.length})` }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-all relative ${activeTab === tab.id ? 'text-[#6C63FF]' : 'text-[#6B7280] hover:text-[#1A1A2E]'}`}>
              {tab.label}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#00B4D8]" />}
            </button>
          ))}
        </div>

        <div className="pb-10">
          {activeTab === 'pitches' && (myPitches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myPitches.map(s => <StartupCard key={s.id} startup={s} compact />)}
            </div>
          ) : <Empty icon="rocket" title="No pitches yet" desc="Submit your first idea!" link="/submit" linkText="Submit Pitch" />)}

          {activeTab === 'saved' && (savedPitches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedPitches.map(s => <StartupCard key={s.id} startup={s} compact />)}
            </div>
          ) : <Empty icon="bookmark" title="Nothing saved" desc="Browse and save startups!" link="/explore" linkText="Explore" />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Empty({ icon, title, desc, link, linkText }) {
  return (
    <div className="text-center py-16">
      {icon === 'rocket'
        ? <Rocket size={32} className="text-[#6C63FF] mx-auto mb-4" />
        : <Bookmark size={32} className="text-[#6B7280] mx-auto mb-4" />
      }
      <h3 className="font-[Syne] text-xl font-semibold text-[#1A1A2E] mb-2">{title}</h3>
      <p className="text-[#6B7280] mb-6">{desc}</p>
      <Link to={link} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6C63FF] text-white text-sm font-medium shadow-lg shadow-[#6C63FF]/25">{linkText}</Link>
    </div>
  );
}
