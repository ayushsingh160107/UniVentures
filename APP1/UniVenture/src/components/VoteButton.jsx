// ========================================
// VoteButton.jsx — Animated upvote with burst particles
// ========================================

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { getStartups, saveStartups, getUser, saveUser } from '../data/mockStartups';

export default function VoteButton({ pitchId, initialVotes, onVoteChange, size = 'md' }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const user = getUser();
    setHasVoted(user.votedStartups?.includes(pitchId) || false);
  }, [pitchId]);

  function handleVote(e) {
    e.preventDefault();
    e.stopPropagation();

    const user = getUser();
    const startups = getStartups();
    const idx = startups.findIndex(s => s.id === pitchId);
    if (idx === -1) return;

    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    if (hasVoted) {
      startups[idx].votes = Math.max(0, startups[idx].votes - 1);
      user.votedStartups = (user.votedStartups || []).filter(id => id !== pitchId);
      setVotes(startups[idx].votes);
      setHasVoted(false);
    } else {
      startups[idx].votes += 1;
      user.votedStartups = [...(user.votedStartups || []), pitchId];
      setVotes(startups[idx].votes);
      setHasVoted(true);
      // Spawn particles on upvote
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        y: -(Math.random() * 40 + 10),
        emoji: ['🔥', '⬆', '✨', '💜', '🚀', '⭐'][i]
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 700);
    }

    saveStartups(startups);
    saveUser(user);
    if (onVoteChange) onVoteChange(startups[idx].votes);
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1',
    md: 'px-4 py-2 text-sm gap-1.5',
    lg: 'px-6 py-3.5 text-base gap-2 w-full justify-center',
  };

  const iconSizes = { sm: 14, md: 16, lg: 22 };

  return (
    <div className="relative">
      {/* Burst particles */}
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute text-sm pointer-events-none vote-particle z-10"
          style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)` }}
        >
          {p.emoji}
        </span>
      ))}

      <button
        onClick={handleVote}
        className={`group relative inline-flex items-center rounded-xl font-semibold transition-all duration-300 btn-ripple cursor-pointer ${sizeClasses[size]}
          ${hasVoted
            ? 'bg-gradient-to-r from-[#6C63FF] to-[#7C74FF] text-white shadow-lg shadow-[#6C63FF]/30 hover:shadow-xl hover:shadow-[#6C63FF]/40'
            : 'bg-white text-[#6B7280] border-2 border-gray-200 hover:border-[#6C63FF]/50 hover:text-[#6C63FF] hover:bg-[#6C63FF]/5 hover:shadow-md'
          }
          ${animating ? 'scale-110' : 'hover:scale-[1.03]'}
        `}
      >
        <ChevronUp
          size={iconSizes[size]}
          className={`transition-transform duration-300 ${animating ? '-translate-y-1' : ''} ${hasVoted ? '' : 'group-hover:-translate-y-0.5'}`}
        />
        <span className="font-mono font-bold tabular-nums">{votes}</span>
        {size === 'lg' && <span className="text-xs opacity-70 ml-1 font-normal">{hasVoted ? 'Voted!' : 'Upvote'}</span>}
      </button>
    </div>
  );
}
