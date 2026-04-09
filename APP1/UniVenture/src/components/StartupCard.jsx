// ========================================
// StartupCard.jsx - Reusable card component
// Used on Home, Explore, Dashboard, and Profile pages
// ========================================

import { Link } from 'react-router-dom';
import { getInitials, getAvatarColor, CATEGORY_COLORS } from '../data/seedData';
import './StartupCard.css';

export default function StartupCard({ startup }) {
  // Get initials and color for the avatar
  const initials = getInitials(startup.authorName);
  const avatarColor = getAvatarColor(startup.authorName);

  // Get badge color for the category
  const catColor = CATEGORY_COLORS[startup.category] || { bg: '#E5E7EB', text: '#374151' };

  // Format date (e.g., "December 4, 2024")
  const date = new Date(startup.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Link to={`/startup/${startup.id}`} className="startup-card">
      {/* Top row: Date and Views */}
      <div className="startup-card__header">
        <span className="startup-card__date">{date}</span>
        <span className="startup-card__views">👁 {startup.views}</span>
      </div>

      {/* Author name and avatar */}
      <div className="startup-card__author">
        <span className="startup-card__author-name">{startup.authorName}</span>
        <div className="startup-card__avatar" style={{ backgroundColor: avatarColor }}>
          {initials}
        </div>
      </div>

      {/* Startup name */}
      <h3 className="startup-card__title">{startup.title}</h3>

      {/* Short description (truncated to 2 lines by CSS) */}
      <p className="startup-card__desc">{startup.description}</p>

      {/* Bottom: Category badge and Likes */}
      <div className="startup-card__footer">
        <span className="startup-card__badge" style={{ backgroundColor: catColor.bg, color: catColor.text }}>
          {startup.category}
        </span>
        <span className="startup-card__likes">👍 {startup.likes}</span>
      </div>
    </Link>
  );
}
