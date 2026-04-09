// ========================================
// Navbar.jsx - Navigation bar (shown on every page)
// ========================================

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInitials, getAvatarColor } from '../data/seedData';
import './Navbar.css';

export default function Navbar() {
  // Get user and logout function from AuthContext
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo - links to home */}
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">🚀</span>
          <span className="navbar-logo-text">Univenture</span>
        </Link>

        {/* Right side buttons */}
        <div className="navbar-actions">
          <Link to="/submit" className="btn btn-primary">Submit Pitch</Link>

          {/* Show different buttons based on login status */}
          {user ? (
            <div className="navbar-user">
              <Link to="/dashboard" className="navbar-avatar"
                style={{ backgroundColor: getAvatarColor(user.name) }}>
                {getInitials(user.name)}
              </Link>
              <button onClick={logout} className="btn btn-outline">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
