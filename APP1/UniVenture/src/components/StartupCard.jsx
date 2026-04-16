// ========================================
// StartupCard.jsx — Interactive card with hover save
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
      className={`group block rounded-2xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 card-tilt relative ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      {/* Hover overlay glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6C63FF]/[0.02] to-[#00B4D8]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Save button - appears on hover */}
      <button
        onClick={handleSave}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          saved
            ? 'bg-[#F59E0B]/10 text-[#F59E0B] scale-100 opacity-100'
            : 'bg-white/80 backdrop-blur-sm text-[#6B7280] border border-gray-200 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'
        } hover:scale-110 active:scale-95 ${saved ? 'bookmark-anim' : ''}`}
      >
        {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      </button>

      {/* Top Row */}
      <div className="flex items-center justify-between mb-3 relative z-[1]">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: domainInfo.color + '12', color: domainInfo.color }}
        >
          {domainInfo.emoji} {startup.domain}
        </span>
        {startup.isTrending && (
          <span className="inline-flex items-center gap-1 text-xs text-[#F59E0B] font-medium">
            <Flame size={12} className="group-hover:animate-[wiggle_0.5s_ease-in-out_infinite]" /> Trending
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className={`font-[Syne] font-bold text-[#1A1A2E] group-hover:text-[#6C63FF] transition-colors duration-300 relative z-[1] ${
        compact ? 'text-base mb-1.5' : 'text-lg mb-2'
      }`}>
        {startup.title}
        <ArrowUpRight size={14} className="inline ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
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
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#6C63FF]/5 text-[#6C63FF] border border-[#6C63FF]/15 group-hover:bg-[#6C63FF]/10 transition-colors">
            {formatFunding(startup.fundingAsk)} Seed
          </span>
          {startup.rolesNeeded && startup.rolesNeeded.length > 0 && (
            <span className="text-xs text-[#6B7280]">
              Looking for {startup.rolesNeeded.slice(0, 2).join(', ')}
            </span>
          )}
        </div>
      )}

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 relative z-[1]">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {startup.founders.slice(0, 3).map((f, i) => (
              <Avatar key={i} name={f.name} size="xs" className="ring-2 ring-white" />
            ))}
          </div>
          <span className="text-xs text-[#6B7280]">{startup.founders[0]?.name}</span>
        </div>

        <div className="flex items-center gap-2" onClick={e => e.preventDefault()}>
          <span className="flex items-center gap-1 text-xs text-[#6B7280]">
            <Eye size={12} /> {startup.views}
          </span>
          <VoteButton pitchId={startup.id} initialVotes={startup.votes} size="sm" />
        </div>
      </div>
    </Link>
  );
}
