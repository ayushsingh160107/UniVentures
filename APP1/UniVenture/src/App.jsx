// ========================================
// App.jsx — Root component with routes
// ========================================

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { initData } from './data/mockStartups';

import Home from './pages/Home';
import Explore from './pages/Explore';
import PitchDetail from './pages/PitchDetail';
import SubmitPitch from './pages/SubmitPitch';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

export default function App() {
  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFF] text-[#1A1A2E] font-[DM_Sans]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/pitch/:id" element={<PitchDetail />} />
        <Route path="/submit" element={<SubmitPitch />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
