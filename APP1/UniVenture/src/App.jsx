// ========================================
// App.jsx - Main component with all routes
// This is the "root" of our application
// ========================================

import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initSeedData } from './data/seedData';
import { useEffect } from 'react';

// Import all pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import StartupDetail from './pages/StartupDetail';
import Submit from './pages/Submit';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import './App.css';

function App() {
  // On first load, populate localStorage with sample data
  useEffect(() => {
    initSeedData();
  }, []);

  return (
    // AuthProvider wraps everything so all pages can access user data
    <AuthProvider>
      <div className="app">
        {/* React Router - maps URLs to page components */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/startup/:id" element={<StartupDetail />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
