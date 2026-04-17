// ========================================
// FilterBar.jsx — Refined filter bar
// ========================================

import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { DOMAINS } from '../data/mockStartups';

const SORT_OPTIONS = [
  { value: 'votes', label: 'Most Voted' },
  { value: 'newest', label: 'Newest' },
  { value: 'comments', label: 'Most Commented' },
  { value: 'trending', label: 'Trending' },
];

const ROLE_FILTERS = [
  'All', 'Looking for Dev', 'Looking for Designer', 'Looking for Marketer'
];

export default function FilterBar({
  searchQuery, setSearchQuery,
  activeDomain, setActiveDomain,
  sortBy, setSortBy,
  roleFilter, setRoleFilter,
  totalCount, filteredCount
}) {
  return (
    <div className="sticky top-16 md:top-18 z-40 bg-white/80 backdrop-blur-2xl border-b border-gray-100/80 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search startups, tags, ideas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-200/80 text-sm text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF]/40 focus:ring-3 focus:ring-[#6C63FF]/8 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex gap-2">
            <div className="relative">
              <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="pl-9 pr-8 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-200/80 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#6C63FF]/40 appearance-none cursor-pointer min-w-[140px] transition-all duration-200"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-4 pr-8 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-200/80 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#6C63FF]/40 appearance-none cursor-pointer transition-all duration-200"
            >
              {ROLE_FILTERS.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Domain Pills */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-0.5">
          <button
            onClick={() => setActiveDomain('All')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeDomain === 'All'
                ? 'bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] text-white shadow-md shadow-[#6C63FF]/15'
                : 'bg-white text-[#6B7280] border border-gray-200/80 hover:border-[#6C63FF]/25 hover:text-[#1A1A2E] hover:shadow-sm'
            } active:scale-95`}
          >
            All
          </button>
          {DOMAINS.map(domain => (
            <button
              key={domain.name}
              onClick={() => setActiveDomain(domain.name)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeDomain === domain.name
                  ? 'text-white shadow-md'
                  : 'bg-white text-[#6B7280] border border-gray-200/80 hover:border-[#6C63FF]/25 hover:text-[#1A1A2E] hover:shadow-sm'
              } active:scale-95`}
              style={activeDomain === domain.name ? {
                background: domain.color,
                boxShadow: `0 4px 14px ${domain.color}25`
              } : {}}
            >
              {domain.name}
            </button>
          ))}

          <span className="shrink-0 ml-auto text-xs text-[#9CA3AF] font-medium tabular-nums">
            {filteredCount} of {totalCount}
          </span>
        </div>
      </div>
    </div>
  );
}
