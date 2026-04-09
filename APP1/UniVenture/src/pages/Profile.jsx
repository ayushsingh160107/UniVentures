import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StartupCard from '../components/StartupCard';
import { getUsers, getStartups, getInitials, getAvatarColor } from '../data/seedData';
import './Profile.css';

export default function Profile() {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [userStartups, setUserStartups] = useState([]);

  useEffect(() => {
    const users = getUsers();
    const found = users.find((u) => u.id === userId);
    setProfileUser(found || null);

    if (found) {
      const startups = getStartups();
      setUserStartups(startups.filter((s) => s.authorId === found.id));
    }
  }, [userId]);

  if (!profileUser) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-container">
          <p className="profile-not-found">User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-hero">
          <div
            className="profile-hero-avatar"
            style={{ backgroundColor: getAvatarColor(profileUser.name) }}
          >
            {getInitials(profileUser.name)}
          </div>
          <h1 className="profile-hero-name">{profileUser.name}</h1>
          <span className="profile-hero-role">{profileUser.role}</span>
          {profileUser.bio && (
            <p className="profile-hero-bio">{profileUser.bio}</p>
          )}
          {profileUser.skills && profileUser.skills.length > 0 && (
            <div className="profile-hero-skills">
              {profileUser.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="profile-startups">
          <h2>Startups by {profileUser.name}</h2>
          {userStartups.length === 0 ? (
            <p className="profile-no-startups">No startups submitted yet.</p>
          ) : (
            <div className="startup-grid">
              {userStartups.map((s) => (
                <StartupCard key={s.id} startup={s} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
