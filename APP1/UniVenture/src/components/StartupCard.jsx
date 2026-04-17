// ========================================
// StartupCard.jsx — Premium card with refined aesthetics
// ========================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, Flame, Bookmark, BookmarkCheck } from 'lucide-react';
import Avatar from './Avatar';
import TagBadge from './TagBadge';
import VoteButton from './VoteButton';
import { formatFunding, getDomainInfo, timeAgo } from '../utils/helpers';
import { getUser, saveUser } from '../data/mockStartups';

export default function StartupCard({ startup, compact = false }) {
  const domainInfo = getDomainInfo(startup.domain);
  const [saved, setSaved] = useState(() => {
    const user = getUser();
    return user.savedStartups?.includes(startup.id) || false;
  });

  function handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    const user = getUser();
    if (saved) {
      user.savedStartups = (user.savedStartups || []).filter(id => id !== startup.id);
      setSaved(false);
    } else {
      user.savedStartups = [...(user.savedStartups || []), startup.id];
      setSaved(true);
    }
    saveUser(user);
  }

  return (
    <Link
      to={`/pitch/${startup.id}`}
      className={`group block rounded-2xl bg-white border border-gray-100/80 overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/40 hover:border-gray-200/80 ${
        compact ? 'p-4' : 'p-5'
      }`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)' }}
    >
      {/* Hover overlay glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top, ${domainInfo.color}05, transparent 60%)` }} />

      {/* Save button - appears on hover */}
      <button
        onClick={handleSave}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          saved
            ? 'bg-[#F59E0B]/10 text-[#F59E0B] scale-100 opacity-100'
            : 'bg-white/90 backdrop-blur-sm text-[#9CA3AF] border border-gray-200/70 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'
        } hover:scale-110 active:scale-95 ${saved ? 'bookmark-anim' : ''}`}
      >
        {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      </button>

      {/* Top Row */}
      <div className="flex items-center justify-between mb-3 relative z-[1]">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: domainInfo.color + '0D', color: domainInfo.color }}
        >
          {startup.domain}
        </span>
        {startup.isTrending && (
          <span className="inline-flex items-center gap-1 text-xs text-[#F59E0B] font-medium bg-[#F59E0B]/5 px-2 py-0.5 rounded-md">
            <Flame size={11} className="group-hover:animate-[wiggle_0.5s_ease-in-out_infinite]" /> Hot
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className={`font-[Syne] font-bold text-[#1A1A2E] group-hover:text-[#6C63FF] transition-colors duration-300 relative z-[1] leading-snug ${
        compact ? 'text-base mb-1.5' : 'text-lg mb-2'
      }`}>
        {startup.title}
        <ArrowUpRight size={14} className="inline ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-40 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
      </h3>

      {/* Tagline */}
      <p className={`text-[#6B7280] leading-relaxed line-clamp-2 relative z-[1] ${compact ? 'text-xs mb-3' : 'text-sm mb-4'}`}>
        {startup.tagline}
      </p>

      {/* Tags */}
      {!compact && startup.tags && (
        <div className="flex flex-wrap gap-1.5 mb-4 relative z-[1]">
          {startup.tags.slice(0, 3).map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* Funding chip */}
      {!compact && (
        <div className="flex items-center gap-2 mb-4 relative z-[1]">
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[#6C63FF]/[0.04] text-[#6C63FF] border border-[#6C63FF]/10 group-hover:bg-[#6C63FF]/[0.08] transition-colors">
            {formatFunding(startup.fundingAsk)} Seed
          </span>
          {startup.rolesNeeded && startup.rolesNeeded.length > 0 && (
            <span className="text-xs text-[#9CA3AF]">
              Hiring {startup.rolesNeeded.slice(0, 2).join(', ')}
            </span>
          )}
        </div>
      )}

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100/80 relative z-[1]">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-1.5">
            {startup.founders.slice(0, 3).map((f, i) => (
              <Avatar key={i} name={f.name} size="xs" className="ring-2 ring-white" />
            ))}
          </div>
          <span className="text-xs font-medium text-[#6B7280]">{startup.founders[0]?.name}</span>
        </div>

        <div className="flex items-center gap-2.5" onClick={e => e.preventDefault()}>
          <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
            <Eye size={12} /> {startup.views}
          </span>
          <VoteButton pitchId={startup.id} initialVotes={startup.votes} size="sm" />
        </div>
      </div>
    </Link>
  );
}
