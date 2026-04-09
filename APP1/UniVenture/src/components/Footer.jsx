import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">🚀</span>
            <span className="footer-logo-text">Univenture</span>
          </Link>
          <p className="footer-description">
            Where ideas meet opportunity. The premier platform for startup founders to pitch and connect
            with like-minded entrepreneurs.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>PLATFORM</h4>
            <Link to="/explore">Browse Startups</Link>
            <Link to="/submit">Submit Pitch</Link>
            <Link to="/explore">Leaderboard</Link>
          </div>
          <div className="footer-col">
            <h4>COMPANY</h4>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>LEGAL</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2024 Univenture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
