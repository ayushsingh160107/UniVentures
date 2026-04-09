// ========================================
// Login.jsx - Login and Signup page
// Route: /login
// ========================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // Which tab is active: 'login' or 'signup'
  const [tab, setTab] = useState('login');
  const [error, setError] = useState('');

  // Login form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup form fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('Entrepreneur');

  // Handle login form submit
  function handleLogin(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  }

  // Handle signup form submit
  function handleSignup(e) {
    e.preventDefault();
    setError('');

    if (!signupName || !signupEmail || !signupPassword) {
      setError('Please fill in all fields');
      return;
    }

    const result = signup(signupName, signupEmail, signupPassword, signupRole);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1>Welcome to Univenture</h1>
            <p>Join the community of innovators</p>
          </div>

          {/* Tab buttons */}
          <div className="login-tabs">
            <button
              className={`login-tab ${tab === 'login' ? 'login-tab--active' : ''}`}
              onClick={() => { setTab('login'); setError(''); }}
            >
              Login
            </button>
            <button
              className={`login-tab ${tab === 'signup' ? 'login-tab--active' : ''}`}
              onClick={() => { setTab('signup'); setError(''); }}
            >
              Sign Up
            </button>
          </div>

          {/* Error message */}
          {error && <div className="login-error">{error}</div>}

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password" />
              </div>
              <button type="submit" className="btn btn-primary login-btn">Login</button>
            </form>
          )}

          {/* Signup Form */}
          {tab === 'signup' && (
            <form onSubmit={handleSignup} className="login-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={signupName} onChange={e => setSignupName(e.target.value)}
                  placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)}
                  placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)}
                  placeholder="Create a password" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={signupRole} onChange={e => setSignupRole(e.target.value)}>
                  <option>Entrepreneur</option>
                  <option>Investor</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Marketer</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary login-btn">Sign Up</button>
            </form>
          )}

          <Link to="/" className="login-guest">Continue as Guest →</Link>
        </div>
      </div>
    </div>
  );
}
