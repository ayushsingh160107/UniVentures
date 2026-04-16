// ========================================
// PitchDetail.jsx — Light theme detail page
// ========================================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Eye, MessageCircle, Bookmark, BookmarkCheck, Share2, Calendar,
  ArrowLeft, UserPlus, Copy, Check, ExternalLink, FileText, Play, Video
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import Avatar from '../components/Avatar';
import VoteButton from '../components/VoteButton';
import TagBadge from '../components/TagBadge';
import { getStartups, saveStartups, getUser, saveUser } from '../data/mockStartups';
import { formatFunding, getDomainInfo, timeAgo } from '../utils/helpers';

export default function PitchDetail() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeTab, setActiveTab] = useState('pitch');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const all = getStartups();
    const found = all.find(s => s.id === id);
    if (found) {
      found.views += 1;
      saveStartups(all);
      setStartup({ ...found });
      const user = getUser();
      setSaved(user.savedStartups?.includes(id) || false);
      setRelated(all.filter(s => s.domain === found.domain && s.id !== found.id).slice(0, 3));
    }
  }, [id]);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleSave() {
    const user = getUser();
    if (saved) {
      user.savedStartups = (user.savedStartups || []).filter(sid => sid !== id);
      setSaved(false);
      showToast('Removed from saved');
    } else {
      user.savedStartups = [...(user.savedStartups || []), id];
      setSaved(true);
      showToast('Saved to watchlist! 🔖');
    }
    saveUser(user);
  }

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Link copied! 📋');
    setTimeout(() => setCopied(false), 2000);
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    const all = getStartups();
    const idx = all.findIndex(s => s.id === id);
    if (idx === -1) return;
    const comment = { id: 'c-' + Date.now(), author: getUser().name, text: newComment, date: new Date().toISOString() };
    all[idx].comments = [...(all[idx].comments || []), comment];
    saveStartups(all);
    setStartup({ ...all[idx] });
    setNewComment('');
    showToast('Comment posted! 💬');
  }

  function handleRequestRole(role) {
    showToast(`Collaboration request sent for ${role}! 🤝`);
  }

  if (!startup) {
    return (
      <div className="min-h-screen bg-[#F8FAFF]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-24 text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="font-[Syne] text-2xl font-bold text-[#1A1A2E] mb-2">Startup not found</h2>
          <Link to="/explore" className="text-[#6C63FF] hover:underline">Back to Explore</Link>
        </div>
      </div>
    );
  }

  const domainInfo = getDomainInfo(startup.domain);
  const tabs = [
    { id: 'pitch', label: 'The Pitch' },
    ...(startup.demoVideo ? [{ id: 'demo', label: '▶ Demo Video' }] : []),
    { id: 'team', label: 'The Team' },
    { id: 'deck', label: 'Deck' },
    { id: 'comments', label: `Comments (${startup.comments?.length || 0})` },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />

      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg toast-enter ${
          toast.type === 'success' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A2E] transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Explore
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN */}
          <main className="flex-1 min-w-0">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: domainInfo.color + '15', color: domainInfo.color }}>
                  {domainInfo.emoji} {startup.domain}
                </span>
                <span className="text-xs text-[#6B7280]">{timeAgo(startup.postedAt)}</span>
              </div>

              <h1 className="font-[Syne] text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{startup.title}</h1>

              <div className="flex items-center gap-3 mb-6">
                <Avatar name={startup.founders[0]?.name || 'Unknown'} size="md" />
                <div>
                  <p className="font-medium text-sm text-[#1A1A2E]">{startup.founders[0]?.name}</p>
                  <p className="text-xs text-[#6B7280]">{startup.founders[0]?.college} · {startup.founders[0]?.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {startup.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
              </div>

              {/* Hero: Video or Emoji fallback */}
              {startup.demoVideo ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-md mb-8 relative group">
                  <iframe
                    src={startup.demoVideo}
                    title={`${startup.title} Demo Video`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={10} /> Demo Video
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 md:h-64 rounded-xl bg-gradient-to-br from-[#6C63FF]/5 to-[#00B4D8]/5 border border-gray-100 flex items-center justify-center mb-8">
                  <span className="text-6xl">{domainInfo.emoji}</span>
                </div>
              )}

              {/* Tabs */}
              <div className="flex gap-1 mb-8 border-b border-gray-100 overflow-x-auto hide-scrollbar">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all relative ${
                      activeTab === tab.id ? 'text-[#6C63FF]' : 'text-[#6B7280] hover:text-[#1A1A2E]'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#00B4D8]" />}
                  </button>
                ))}
              </div>

              <div className="animate-fade-up">
                {activeTab === 'pitch' && (
                  <div className="space-y-8">
                    <PitchSection emoji="🎯" title="Problem" content={startup.problem} />
                    <PitchSection emoji="💡" title="Solution" content={startup.solution} />
                    <PitchSection emoji="📊" title="Target Market" content={startup.market} />
                    <div>
                      <h3 className="font-[Syne] font-semibold text-lg mb-4 flex items-center gap-2">
                        <span>📈</span>
                        <span className="bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] bg-clip-text text-transparent">Market Size: {startup.marketSize}</span>
                      </h3>
                      <div className="space-y-3">
                        {[{ label: 'TAM', width: '100%', color: '#6C63FF' }, { label: 'SAM', width: '60%', color: '#00B4D8' }, { label: 'SOM', width: '25%', color: '#10B981' }].map(bar => (
                          <div key={bar.label} className="flex items-center gap-3">
                            <span className="text-xs font-mono text-[#6B7280] w-10">{bar.label}</span>
                            <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-1000" style={{ width: bar.width, backgroundColor: bar.color + '40' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <PitchSection emoji="🚀" title="Traction" content={startup.traction} />
                    <div className="p-5 rounded-xl bg-[#6C63FF]/5 border border-[#6C63FF]/15">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Funding Required</p>
                          <p className="font-[Syne] text-2xl font-bold text-[#6C63FF]">{formatFunding(startup.fundingAsk)}</p>
                        </div>
                        <span className="px-3 py-1 rounded-lg text-xs font-medium bg-[#6C63FF]/10 text-[#6C63FF]">{startup.fundingType}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'demo' && startup.demoVideo && (
                  <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-lg">
                      <div className="aspect-video">
                        <iframe
                          src={startup.demoVideo}
                          title={`${startup.title} Demo`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-r from-[#6C63FF]/5 to-[#00B4D8]/5 border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center">
                          <Video size={20} className="text-[#6C63FF]" />
                        </div>
                        <div>
                          <h4 className="font-[Syne] font-semibold text-[#1A1A2E]">Product Demo</h4>
                          <p className="text-xs text-[#6B7280]">Watch how {startup.title} works in action</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#6B7280] leading-relaxed mt-3">
                        This demo showcases the core features and user experience of {startup.title}. 
                        For a live walkthrough or more details, contact the founder at{' '}
                        <a href={`mailto:${startup.contactEmail}`} className="text-[#6C63FF] hover:underline">{startup.contactEmail}</a>.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {startup.founders.map((founder, i) => (
                      <div key={i} className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar name={founder.name} size="lg" />
                          <div>
                            <h4 className="font-semibold text-[#1A1A2E]">{founder.name}</h4>
                            <p className="text-xs text-[#6B7280]">{founder.college}</p>
                          </div>
                        </div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#6C63FF]/10 text-[#6C63FF]">{founder.role}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'deck' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} className="text-[#6B7280]" />
                    </div>
                    <h3 className="font-[Syne] text-lg font-semibold text-[#1A1A2E] mb-2">Pitch Deck</h3>
                    <p className="text-sm text-[#6B7280] mb-6">PDF viewer coming soon. Contact the founder for the deck.</p>
                    <a href={`mailto:${startup.contactEmail}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6C63FF]/5 text-[#6C63FF] text-sm font-medium border border-[#6C63FF]/15 hover:bg-[#6C63FF]/10 transition-colors">
                      <ExternalLink size={14} /> Request Deck
                    </a>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div>
                    <form onSubmit={handleAddComment} className="mb-8">
                      <div className="flex gap-3">
                        <Avatar name={getUser().name} size="md" />
                        <div className="flex-1">
                          <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add a comment..." rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#1A1A2E] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF]/50 focus:ring-2 focus:ring-[#6C63FF]/10 resize-none" />
                          <button type="submit" disabled={!newComment.trim()}
                            className="mt-2 px-5 py-2 rounded-xl bg-[#6C63FF] text-white text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#5B54E6] transition-colors">
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="space-y-4">
                      {(startup.comments || []).map(comment => (
                        <div key={comment.id} className="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                          <Avatar name={comment.author} size="sm" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-[#1A1A2E]">{comment.author}</span>
                              <span className="text-xs text-[#6B7280]">{timeAgo(comment.date)}</span>
                            </div>
                            <p className="text-sm text-[#6B7280] leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                      {(!startup.comments || startup.comments.length === 0) && (
                        <p className="text-center py-8 text-[#6B7280]">No comments yet. Be the first!</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                <VoteButton pitchId={startup.id} initialVotes={startup.votes} size="lg" />
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 grid grid-cols-2 gap-4">
                {[{ icon: Eye, label: 'Views', value: startup.views }, { icon: Bookmark, label: 'Saves', value: startup.saves },
                  { icon: MessageCircle, label: 'Comments', value: startup.comments?.length || 0 }, { icon: Calendar, label: 'Posted', value: timeAgo(startup.postedAt).replace(' ago', '') }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <stat.icon size={16} className="text-[#6B7280] mx-auto mb-1" />
                    <p className="text-lg font-semibold font-mono text-[#1A1A2E]">{stat.value}</p>
                    <p className="text-xs text-[#6B7280]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                <p className="text-xs text-[#6B7280] mb-1">Asking</p>
                <p className="font-[Syne] text-xl font-bold text-[#6C63FF] mb-2">{formatFunding(startup.fundingAsk)}</p>
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#6C63FF]/10 text-[#6C63FF]">{startup.fundingType}</span>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                <h4 className="font-[Syne] font-semibold text-sm mb-3 flex items-center gap-2 text-[#1A1A2E]">
                  <UserPlus size={14} className="text-[#00B4D8]" /> Roles Needed
                </h4>
                <div className="space-y-2">
                  {startup.rolesNeeded?.map(role => (
                    <button key={role} onClick={() => handleRequestRole(role)}
                      className="group/role w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm hover:border-[#00B4D8]/40 hover:bg-gradient-to-r hover:from-[#00B4D8]/5 hover:to-transparent transition-all duration-300 text-[#1A1A2E] btn-ripple active:scale-[0.98]">
                      <span className="font-medium">{role}</span>
                      <span className="text-xs text-[#00B4D8] font-semibold flex items-center gap-1 group-hover/role:gap-2 transition-all">
                        Apply <span className="group-hover/role:translate-x-0.5 transition-transform">→</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
                {/* SAVE BUTTON */}
                <button onClick={handleSave}
                  className={`group/save w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 btn-ripple active:scale-[0.97] ${
                    saved
                      ? 'bg-gradient-to-r from-[#F59E0B]/10 to-[#FFD700]/10 text-[#F59E0B] border-2 border-[#F59E0B]/25 shadow-md shadow-[#F59E0B]/10'
                      : 'bg-white text-[#6B7280] border-2 border-gray-200 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 hover:shadow-md'
                  }`}>
                  <span className={saved ? 'bookmark-anim' : 'group-hover/save:scale-110 transition-transform'}>
                    {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </span>
                  <span>{saved ? '✓ Saved to Watchlist' : 'Save to Watchlist'}</span>
                </button>

                {/* SHARE BUTTON */}
                <button onClick={handleCopy}
                  className={`group/share w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 btn-ripple active:scale-[0.97] ${
                    copied
                      ? 'bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 text-[#10B981] border-2 border-[#10B981]/25 shadow-md shadow-[#10B981]/10'
                      : 'bg-white text-[#6B7280] border-2 border-gray-200 hover:border-[#6C63FF]/40 hover:text-[#6C63FF] hover:bg-[#6C63FF]/5 hover:shadow-md'
                  }`}>
                  <span className={copied ? 'success-ring inline-block' : 'group-hover/share:rotate-12 transition-transform'}>
                    {copied ? <Check size={18} /> : <Share2 size={18} />}
                  </span>
                  <span>{copied ? '✓ Link Copied!' : 'Share This Pitch'}</span>
                </button>

                {/* CONTACT BUTTON */}
                <a href={`mailto:${startup.contactEmail}`}
                  className="group/contact w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] text-white shadow-lg shadow-[#6C63FF]/20 hover:shadow-xl hover:shadow-[#6C63FF]/30 transition-all duration-300 btn-ripple active:scale-[0.97]">
                  <ExternalLink size={16} className="group-hover/contact:rotate-12 transition-transform" />
                  Contact Founder
                </a>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-[Syne] text-2xl font-bold text-[#1A1A2E] mb-6">Related Startups</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(s => <StartupCard key={s.id} startup={s} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function PitchSection({ emoji, title, content }) {
  return (
    <div>
      <h3 className="font-[Syne] font-semibold text-lg mb-3 flex items-center gap-2">
        <span>{emoji}</span>
        <span className="bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] bg-clip-text text-transparent">{title}</span>
      </h3>
      <p className="text-[#6B7280] leading-relaxed">{content}</p>
    </div>
  );
}
