// ========================================
// Dashboard.jsx - User's personal dashboard
// Route: /dashboard (protected - redirects to /login if not logged in)
// ========================================

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import { getStartups, saveStartups, getInitials, getAvatarColor } from '../data/seedData';
import './Dashboard.css';

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Which tab is active
  const [activeTab, setActiveTab] = useState('ideas');
  const [startups, setStartups] = useState([]);

  // Profile editing
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editSkills, setEditSkills] = useState('');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setStartups(getStartups());
    setEditName(user.name);
    setEditBio(user.bio || '');
    setEditSkills((user.skills || []).join(', '));
  }, [user, navigate]);

  // Don't render anything if not logged in
  if (!user) return null;

  // Filter startups by current user
  const myStartups = startups.filter(s => s.authorId === user.id);

  // Get saved startups
  const savedIds = user.savedStartups || [];
  const savedStartups = startups.filter(s => savedIds.includes(s.id));

  // Delete a startup
  function handleDelete(id) {
    if (!window.confirm('Delete this startup?')) return;
    const updated = startups.filter(s => s.id !== id);
    saveStartups(updated);
    setStartups(updated);
  }

  // Save profile changes
  function handleSaveProfile() {
    updateUser({
      name: editName,
      bio: editBio,
      skills: editSkills.split(',').map(s => s.trim()).filter(Boolean)
    });
    setEditing(false);
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-layout">
        {/* ---- Sidebar ---- */}
        <aside className="dashboard-sidebar">
          <div className="dashboard-user">
            <div className="dashboard-avatar" style={{ backgroundColor: getAvatarColor(user.name) }}>
              {getInitials(user.name)}
            </div>
            <h3>{user.name}</h3>
            <span className="dashboard-role">{user.role}</span>
          </div>

          <nav className="dashboard-nav">
            <button className={`dashboard-nav-item ${activeTab === 'ideas' ? 'dashboard-nav-item--active' : ''}`}
              onClick={() => setActiveTab('ideas')}>
              💡 My Ideas <span className="dashboard-nav-count">{myStartups.length}</span>
            </button>
            <button className={`dashboard-nav-item ${activeTab === 'saved' ? 'dashboard-nav-item--active' : ''}`}
              onClick={() => setActiveTab('saved')}>
              🔖 Saved <span className="dashboard-nav-count">{savedStartups.length}</span>
            </button>
            <button className={`dashboard-nav-item ${activeTab === 'profile' ? 'dashboard-nav-item--active' : ''}`}
              onClick={() => setActiveTab('profile')}>
              👤 Profile
            </button>
          </nav>
        </aside>

        {/* ---- Main Content ---- */}
        <main className="dashboard-main">

          {/* My Ideas Tab */}
          {activeTab === 'ideas' && (
            <div className="dashboard-section fade-in">
              <h2>My Startup Ideas</h2>
              {myStartups.length === 0 ? (
                <div className="dashboard-empty">
                  <p>You haven't submitted any startups yet.</p>
                  <Link to="/submit" className="btn btn-primary">Submit Your First Pitch</Link>
                </div>
              ) : (
                <div className="dashboard-grid">
                  {myStartups.map(s => (
                    <div key={s.id} className="dashboard-card-wrapper">
                      <StartupCard startup={s} />
                      <div className="dashboard-card-actions">
                        <button className="btn-sm btn-sm--danger" onClick={() => handleDelete(s.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Tab */}
          {activeTab === 'saved' && (
            <div className="dashboard-section fade-in">
              <h2>Saved Startups</h2>
              {savedStartups.length === 0 ? (
                <div className="dashboard-empty">
                  <p>You haven't saved any startups yet.</p>
                  <Link to="/explore" className="btn btn-primary">Explore Startups</Link>
                </div>
              ) : (
                <div className="dashboard-grid">
                  {savedStartups.map(s => (
                    <StartupCard key={s.id} startup={s} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="dashboard-section fade-in">
              <h2>Profile</h2>
              <div className="profile-card">
                {editing ? (
                  // Edit mode
                  <div className="profile-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input value={editName} onChange={e => setEditName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Bio</label>
                      <textarea value={editBio} onChange={e => setEditBio(e.target.value)}
                        rows="4" placeholder="Tell us about yourself..." />
                    </div>
                    <div className="form-group">
                      <label>Skills (comma-separated)</label>
                      <input value={editSkills} onChange={e => setEditSkills(e.target.value)}
                        placeholder="React, Node.js, Python..." />
                    </div>
                    <div className="profile-form-actions">
                      <button className="btn btn-primary" onClick={handleSaveProfile}>Save</button>
                      <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="profile-view">
                    <div className="profile-view-header">
                      <div className="profile-view-avatar" style={{ backgroundColor: getAvatarColor(user.name) }}>
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <h3>{user.name}</h3>
                        <span className="profile-view-role">{user.role}</span>
                        <p className="profile-view-email">{user.email}</p>
                      </div>
                    </div>
                    {user.bio && <p className="profile-view-bio">{user.bio}</p>}
                    {user.skills && user.skills.length > 0 && (
                      <div className="profile-view-skills">
                        {user.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    )}
                    <button className="btn btn-outline" onClick={() => setEditing(true)}>Edit Profile</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
