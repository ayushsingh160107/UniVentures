// ========================================
// Dashboard.jsx — Premium dashboard (refined)
// ========================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Rocket, Users, Bookmark, Trash2, Check, X, Activity, PenLine, MessageCircle, Heart, TrendingUp, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import Avatar from '../components/Avatar';
import { getUser, getStartups, saveStartups, getRequests, saveRequests, getActivity } from '../data/mockStartups';

// Map activity types to icons
const ACTIVITY_ICONS = {
  vote: { icon: ChevronUp, color: '#6C63FF', bg: '#6C63FF' },
  comment: { icon: MessageCircle, color: '#00B4D8', bg: '#00B4D8' },
  save: { icon: Star, color: '#F59E0B', bg: '#F59E0B' },
  team: { icon: Users, color: '#10B981', bg: '#10B981' },
  trending: { icon: TrendingUp, color: '#EF4444', bg: '#EF4444' },
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [startups, setStartups] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activity, setActivity] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setUser(getUser());
    setStartups(getStartups());
    setRequests(getRequests());
    setActivity(getActivity());
  }, []);

  if (!user) return null;

  const myPitches = startups.filter(s => s.founders?.some(f => f.name === user.name));
  const savedPitches = startups.filter(s => (user.savedStartups || []).includes(s.id));
  const totalVotes = myPitches.reduce((sum, s) => sum + s.votes, 0);
  const pendingRequests = requests.filter(r => r.status === 'pending');

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 3000); }

  function handleDelete(id) {
    const updated = startups.filter(s => s.id !== id);
    saveStartups(updated);
    setStartups(updated);
    setDeleteConfirm(null);
    showToast('Startup deleted');
  }

  function handleRequest(reqId, action) {
    const updated = requests.map(r => r.id === reqId ? { ...r, status: action } : r);
    saveRequests(updated);
    setRequests(updated);
    showToast(action === 'accepted' ? 'Request accepted' : 'Request declined');
  }

  const metrics = [
    { icon: ChevronUp, label: 'Total Votes', value: totalVotes, color: '#6C63FF', bg: 'from-[#6C63FF]/[0.04] to-[#6C63FF]/[0.08]' },
    { icon: Rocket, label: 'Pitches', value: myPitches.length, color: '#00B4D8', bg: 'from-[#00B4D8]/[0.04] to-[#00B4D8]/[0.08]' },
    { icon: Users, label: 'Requests', value: pendingRequests.length, color: '#F59E0B', bg: 'from-[#F59E0B]/[0.04] to-[#F59E0B]/[0.08]' },
    { icon: Bookmark, label: 'Saved', value: savedPitches.length, color: '#10B981', bg: 'from-[#10B981]/[0.04] to-[#10B981]/[0.08]' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />

      {toast && (
        <div className="fixed top-20 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg toast-enter bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 backdrop-blur-sm">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Greeting */}
        <div className="mb-10">
          <h1 className="font-[Syne] text-3xl md:text-4xl font-bold text-[#1A1A2E] tracking-tight">
            Hey, {user.name.split(' ')[0]}
          </h1>
          <p className="text-[#9CA3AF] mt-1.5">Here's what's happening with your startups</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, i) => (
            <div key={i} className={`rounded-2xl bg-gradient-to-br ${m.bg} border border-gray-100/60 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-white shadow-sm" style={{ color: m.color }}>
                <m.icon size={20} />
              </div>
              <p className="text-2xl font-bold font-mono text-[#1A1A2E] tabular-nums">{m.value}</p>
              <p className="text-xs text-[#9CA3AF] mt-1 font-medium">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            {/* Pitches */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-[Syne] text-xl font-bold text-[#1A1A2E]">Your Pitches</h2>
                <Link to="/submit" className="text-sm text-[#6C63FF] hover:text-[#00B4D8] font-semibold transition-colors flex items-center gap-1">
                  + New Pitch
                </Link>
              </div>
              {myPitches.length > 0 ? (
                <div className="space-y-3">
                  {myPitches.map(pitch => (
                    <div key={pitch.id} className="group rounded-xl bg-white border border-gray-100/80 p-4 flex items-center gap-4 hover:shadow-md hover:border-gray-200/80 transition-all duration-300"
                      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                      <div className="flex-1 min-w-0">
                        <Link to={`/pitch/${pitch.id}`} className="font-semibold text-sm text-[#1A1A2E] hover:text-[#6C63FF] transition-colors">{pitch.title}</Link>
                        <p className="text-xs text-[#9CA3AF] mt-0.5 truncate">{pitch.tagline}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-[#9CA3AF]"><span className="font-mono font-bold text-[#6C63FF]">{pitch.votes}</span> votes</span>
                        <Link to={`/pitch/${pitch.id}`} className="p-2 rounded-lg bg-gray-50 text-[#9CA3AF] hover:text-[#6C63FF] hover:bg-[#6C63FF]/5 transition-all"><PenLine size={14} /></Link>
                        {deleteConfirm === pitch.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(pitch.id)} className="p-2 rounded-lg bg-[#EF4444]/5 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"><Check size={14} /></button>
                            <button onClick={() => setDeleteConfirm(null)} className="p-2 rounded-lg bg-gray-50 text-[#9CA3AF] hover:text-[#1A1A2E] transition-colors"><X size={14} /></button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(pitch.id)} className="p-2 rounded-lg bg-gray-50 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/5 transition-all"><Trash2 size={14} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white border border-gray-100/80 p-10 text-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-[#6C63FF]/[0.06] flex items-center justify-center mx-auto mb-4">
                    <Rocket size={24} className="text-[#6C63FF]" />
                  </div>
                  <p className="text-[#6B7280] mb-5">No pitches yet. Share your first idea!</p>
                  <Link to="/submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#7B74FF] text-white text-sm font-semibold shadow-lg shadow-[#6C63FF]/20 hover:shadow-xl transition-all"><Rocket size={14} /> Submit Pitch</Link>
                </div>
              )}
            </section>

            {/* Saved */}
            <section>
              <h2 className="font-[Syne] text-xl font-bold text-[#1A1A2E] mb-5">Saved Startups</h2>
              {savedPitches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{savedPitches.map(s => <StartupCard key={s.id} startup={s} compact />)}</div>
              ) : (
                <div className="rounded-2xl bg-white border border-gray-100/80 p-10 text-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                    <Bookmark size={24} className="text-[#9CA3AF]" />
                  </div>
                  <p className="text-[#6B7280] mb-5">Save startups to track them here</p>
                  <Link to="/explore" className="text-sm text-[#6C63FF] hover:underline font-medium">Browse Startups →</Link>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Requests */}
            <section className="rounded-2xl bg-white border border-gray-100/80 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <h3 className="font-[Syne] text-base font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                  <Users size={14} className="text-[#F59E0B]" />
                </div>
                Collaboration Requests
              </h3>
              <div className="space-y-3">
                {requests.map(req => (
                  <div key={req.id} className="rounded-xl bg-[#F9FAFB] border border-gray-100/80 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar name={req.personName} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1A2E]">{req.personName}</p>
                        <p className="text-xs text-[#9CA3AF]">wants to join <span className="text-[#6C63FF] font-medium">{req.pitchTitle}</span> as {req.role}</p>
                      </div>
                    </div>
                    {req.status === 'pending' ? (
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => handleRequest(req.id, 'accepted')} className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 transition-colors">Accept</button>
                        <button onClick={() => handleRequest(req.id, 'declined')} className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-[#6B7280] hover:text-[#1A1A2E] transition-colors">Decline</button>
                      </div>
                    ) : (
                      <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${req.status === 'accepted' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Activity */}
            <section className="rounded-2xl bg-white border border-gray-100/80 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <h3 className="font-[Syne] text-base font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#00B4D8]/10 flex items-center justify-center">
                  <Activity size={14} className="text-[#00B4D8]" />
                </div>
                Activity Feed
              </h3>
              <div className="space-y-2">
                {activity.map(item => {
                  const activityMeta = ACTIVITY_ICONS[item.icon] || ACTIVITY_ICONS.vote;
                  const IconComponent = activityMeta.icon;
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F9FAFB] hover:bg-gray-100/60 transition-colors">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: activityMeta.bg + '10' }}>
                        <IconComponent size={14} style={{ color: activityMeta.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1A1A2E] truncate">{item.text}</p>
                        <p className="text-xs text-[#9CA3AF]">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
