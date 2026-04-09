// ========================================
// Home.jsx - Landing page of Univenture
// Route: /
// ========================================

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import { getStartups } from '../data/seedData';
import './Home.css';

export default function Home() {
  const [startups, setStartups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Load startups on page load
  useEffect(() => {
    setStartups(getStartups());
  }, []);

  // Handle search — redirects to Explore page with query
  function handleSearch(e) {
    e.preventDefault();
    navigate('/explore?search=' + searchQuery);
  }

  // Calculate stats
  const totalStartups = startups.length;
  const totalLikes = startups.reduce((sum, s) => sum + s.likes, 0);

  return (
    <div className="home-page">
      <Navbar />

      {/* ---- Hero Section (sky blue background) ---- */}
      <section className="hero">
        <div className="hero-container">
          {/* Black rounded box with heading */}
          <div className="hero-heading-box">
            <h1 className="hero-heading">
              PITCH YOUR STARTUP,<br />
              CONNECT WITH ENTREPRENEURS
            </h1>
          </div>

          <p className="hero-subtext">
            🚀 Submit Ideas, Vote on Ideas, and Connect with Entrepreneurs
          </p>

          {/* Search bar */}
          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search startups, founders, ideas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="hero-search__input"
            />
            <button type="submit" className="hero-search__btn">🔍</button>
          </form>

          {/* Avatar stack */}
          <div className="hero-members">
            <div className="hero-avatars">
              <div className="hero-avatar" style={{ backgroundColor: '#1A1A2E' }}>RS</div>
              <div className="hero-avatar" style={{ backgroundColor: '#6C5CE7' }}>PS</div>
              <div className="hero-avatar" style={{ backgroundColor: '#00B894' }}>AC</div>
            </div>
            <span className="hero-members-text">
              Join <strong>2,400+</strong> entrepreneurs
            </span>
          </div>
        </div>
      </section>

      {/* ---- Featured Startups ---- */}
      <section className="featured">
        <div className="featured-container">
          <div className="featured-header">
            <h2 className="featured-title">Featured Startups</h2>
            <Link to="/explore" className="featured-link">View All →</Link>
          </div>

          {/* 3-column grid of startup cards */}
          <div className="startup-grid">
            {startups.slice(0, 6).map(startup => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
        </div>
      </section>

      {/* ---- Stats Bar ---- */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{totalStartups}</span>
            <span className="stat-label">Startups</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">2,400+</span>
            <span className="stat-label">Entrepreneurs</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">{totalLikes}</span>
            <span className="stat-label">Ideas Funded</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
