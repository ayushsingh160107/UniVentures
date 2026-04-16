// ========================================
// Explore.jsx — Browse startups (light theme)
// ========================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import FilterBar from '../components/FilterBar';
import { getStartups } from '../data/mockStartups';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const [startups, setStartups] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeDomain, setActiveDomain] = useState(searchParams.get('domain') || 'All');
  const [sortBy, setSortBy] = useState('votes');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    setStartups(getStartups());
  }, []);

  const filtered = startups
    .filter(s => {
      const matchesDomain = activeDomain === 'All' || s.domain === activeDomain;
      const query = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        s.title.toLowerCase().includes(query) ||
        s.tagline.toLowerCase().includes(query) ||
        s.tags.some(t => t.toLowerCase().includes(query));

      let matchesRole = true;
      if (roleFilter === 'Looking for Dev') matchesRole = s.rolesNeeded?.includes('Developer');
      else if (roleFilter === 'Looking for Designer') matchesRole = s.rolesNeeded?.includes('Designer');
      else if (roleFilter === 'Looking for Marketer') matchesRole = s.rolesNeeded?.includes('Marketer');

      return matchesDomain && matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      if (sortBy === 'newest') return new Date(b.postedAt) - new Date(a.postedAt);
      if (sortBy === 'comments') return (b.comments?.length || 0) - (a.comments?.length || 0);
      if (sortBy === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.votes - a.votes;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />

      <FilterBar
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        activeDomain={activeDomain} setActiveDomain={setActiveDomain}
        sortBy={sortBy} setSortBy={setSortBy}
        roleFilter={roleFilter} setRoleFilter={setRoleFilter}
        totalCount={startups.length} filteredCount={filtered.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-4">
        <div className="mb-8">
          <h1 className="font-[Syne] text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-2">
            {activeDomain === 'All' ? 'All Startups' : activeDomain}
          </h1>
          <p className="text-[#6B7280]">Discover the next big thing from college founders</p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((startup, i) => (
              <div key={startup.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 0.05}s` }}>
                <StartupCard startup={startup} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="font-[Syne] text-xl font-semibold text-[#1A1A2E] mb-2">No startups found</h3>
            <p className="text-[#6B7280]">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
