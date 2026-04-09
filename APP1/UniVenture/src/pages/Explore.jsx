// ========================================
// Explore.jsx - Browse all startups with filters
// Route: /explore
// ========================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import { getStartups, CATEGORIES } from '../data/seedData';
import './Explore.css';

export default function Explore() {
  // Get search query from URL (e.g., /explore?search=AI)
  const [searchParams] = useSearchParams();

  const [startups, setStartups] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Load startups on page load
  useEffect(() => {
    setStartups(getStartups());
  }, []);

  // Filter startups based on category and search
  const filtered = startups.filter(s => {
    // Check category
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;

    // Check search query (search in title, author, description)
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      s.title.toLowerCase().includes(query) ||
      s.authorName.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="explore-page">
      <Navbar />

      <div className="explore-container">
        {/* Header */}
        <div className="explore-header">
          <h1 className="explore-title">All Startups</h1>
          <span className="explore-count">{filtered.length} startups</span>
        </div>

        {/* Filters */}
        <div className="explore-filters">
          {/* Category chips */}
          <div className="category-chips">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-chip ${activeCategory === cat ? 'category-chip--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="explore-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search startups..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Startup cards grid */}
        <div className="startup-grid">
          {filtered.map(startup => (
            <StartupCard key={startup.id} startup={startup} />
          ))}

          {/* Show message if no results */}
          {filtered.length === 0 && (
            <div className="explore-empty">
              <p>No startups found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
