// ========================================
// Navbar.jsx — Sticky navbar (light theme)
// ========================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { to: '/explore', label: 'Explore' },
    { to: '/submit', label: 'Submit Pitch' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00B4D8] flex items-center justify-center transition-transform group-hover:scale-110">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="font-[Syne] text-xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] bg-clip-text text-transparent">
              UniVenture
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isActive(link.to)
                    ? 'text-[#6C63FF]'
                    : 'text-[#6B7280] hover:text-[#1A1A2E]'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/profile/user-001"
              className="px-4 py-2 rounded-xl text-sm font-medium border border-[#6C63FF]/40 text-[#6C63FF] hover:bg-[#6C63FF]/5 transition-all duration-200"
            >
              My Profile
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#6B7280] hover:text-[#1A1A2E] transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-[#6C63FF]/5 text-[#6C63FF]'
                  : 'text-[#6B7280] hover:text-[#1A1A2E] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/profile/user-001"
            className="block px-4 py-3 rounded-lg text-sm font-medium text-[#6C63FF] hover:bg-[#6C63FF]/5 transition-colors"
          >
            My Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
