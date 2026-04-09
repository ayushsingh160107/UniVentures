// ========================================
// StartupDetail.jsx - Shows full details of one startup
// Route: /startup/:id
// ========================================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import { getStartups, saveStartups, getInitials, getAvatarColor, CATEGORY_COLORS } from '../data/seedData';
import { useAuth } from '../context/AuthContext';
import './StartupDetail.css';

export default function StartupDetail() {
  // Get the startup ID from the URL (e.g., /startup/startup-1)
  const { id } = useParams();

  // Get logged-in user
  const { user } = useAuth();

  // State variables
  const [startup, setStartup] = useState(null);
  const [related, setRelated] = useState([]);
  const [liked, setLiked] = useState(false);

  // Load startup data when page opens
  useEffect(() => {
    const allStartups = getStartups();
    const found = allStartups.find(s => s.id === id);

    if (found) {
      // Add 1 view
      found.views = found.views + 1;
      saveStartups(allStartups);
      setStartup({ ...found });

      // Check if current user already liked this
      if (user && found.likedBy.includes(user.id)) {
        setLiked(true);
      }

      // Find related startups (same category)
      const sameCategory = allStartups.filter(s => s.category === found.category && s.id !== found.id);
      setRelated(sameCategory.slice(0, 3));
    }
  }, [id]);

  // Handle like button click
  function handleLike() {
    if (!user) {
      alert('Please login to like startups');
      return;
    }

    const allStartups = getStartups();
    const index = allStartups.findIndex(s => s.id === id);

    if (liked) {
      // Unlike
      allStartups[index].likes = allStartups[index].likes - 1;
      allStartups[index].likedBy = allStartups[index].likedBy.filter(uid => uid !== user.id);
    } else {
      // Like
      allStartups[index].likes = allStartups[index].likes + 1;
      allStartups[index].likedBy.push(user.id);
    }

    saveStartups(allStartups);
    setStartup({ ...allStartups[index] });
    setLiked(!liked);
  }

  // Show loading/not found state
  if (!startup) {
    return (
      <div className="detail-page">
        <Navbar />
        <div className="detail-container">
          <p className="detail-not-found">Startup not found.</p>
        </div>
      </div>
    );
  }

  // Get category badge color
  const catColor = CATEGORY_COLORS[startup.category] || { bg: '#E5E7EB', text: '#374151' };

  // Format date nicely
  const date = new Date(startup.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="detail-page">
      <Navbar />

      <div className="detail-layout">
        {/* Main Content */}
        <main className="detail-main">
          <div className="detail-card">

            {/* Category badge and date */}
            <div className="detail-top">
              <span className="detail-badge" style={{ backgroundColor: catColor.bg, color: catColor.text }}>
                {startup.category}
              </span>
              <span className="detail-date">{date}</span>
            </div>

            {/* Startup title */}
            <h1 className="detail-title">{startup.title}</h1>

            {/* Author info */}
            <div className="detail-author">
              <div className="detail-author-avatar" style={{ backgroundColor: getAvatarColor(startup.authorName) }}>
                {getInitials(startup.authorName)}
              </div>
              <div>
                <Link to={`/profile/${startup.authorId}`} className="detail-author-name">
                  {startup.authorName}
                </Link>
                <span className="detail-author-label">Founder</span>
              </div>
            </div>

            {/* Description */}
            <p className="detail-description">{startup.description}</p>

            {/* Pitch sections */}
            <div className="detail-sections">
              <div className="detail-section">
                <h3>🎯 Problem</h3>
                <p>{startup.problem}</p>
              </div>
              <div className="detail-section">
                <h3>💡 Solution</h3>
                <p>{startup.solution}</p>
              </div>
              <div className="detail-section">
                <h3>🎪 Target Market</h3>
                <p>{startup.market}</p>
              </div>
              <div className="detail-section">
                <h3>💰 Funding Required</h3>
                <p className="detail-funding">{startup.funding}</p>
              </div>
            </div>

            {/* Views and Like button */}
            <div className="detail-actions">
              <div className="detail-stats">
                <span className="detail-stat">👁 {startup.views} views</span>
                <button
                  className={`detail-like-btn ${liked ? 'detail-like-btn--active' : ''}`}
                  onClick={handleLike}
                >
                  👍 {startup.likes} likes
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar - Related Startups */}
        {related.length > 0 && (
          <aside className="detail-sidebar">
            <h3 className="detail-sidebar-title">Related Startups</h3>
            <div className="detail-sidebar-list">
              {related.map(s => (
                <StartupCard key={s.id} startup={s} />
              ))}
            </div>
          </aside>
        )}
      </div>

      <Footer />
    </div>
  );
}
