// ========================================
// Navbar.jsx — Sticky navbar with auth state
// ========================================

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, LogOut } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    // Check auth state on each navigation
    const authData = localStorage.getItem('uv_auth');
    setAuth(authData ? JSON.parse(authData) : null);
  }, [location]);

  const isLoggedIn = auth?.loggedIn;

  function handleLogout() {
    localStorage.removeItem('uv_auth');
    setAuth(null);
    navigate('/');
  }

  const links = [
    { to: '/explore', label: 'Explore' },
    { to: '/submit', label: 'Submit Pitch' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/85 backdrop-blur-2xl border-b border-gray-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00B4D8] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-[#6C63FF]/25">
              <Rocket size={16} className="text-white" />
            </div>
            <span className="font-[Syne] text-xl font-bold text-gradient">
              UniVenture
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive(link.to)
                    ? 'text-[#6C63FF] bg-[#6C63FF]/[0.04]'
                    : 'text-[#6B7280] hover:text-[#1A1A2E] hover:bg-gray-50/80'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile/user-001"
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-[#6C63FF]/25 text-[#6C63FF] hover:bg-[#6C63FF]/[0.04] hover:border-[#6C63FF]/40 transition-all duration-200"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/5 transition-all duration-200"
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E] hover:bg-gray-50/80 transition-all duration-200"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#6C63FF] to-[#7B74FF] text-white shadow-md shadow-[#6C63FF]/15 hover:shadow-lg hover:shadow-[#6C63FF]/25 hover:scale-[1.02] transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-[#6B7280] hover:text-[#1A1A2E] hover:bg-gray-50 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-2xl border-t border-gray-100 px-4 py-3 space-y-1 shadow-xl">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-[#6C63FF]/[0.04] text-[#6C63FF]'
                  : 'text-[#6B7280] hover:text-[#1A1A2E] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile/user-001"
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-[#6C63FF] hover:bg-[#6C63FF]/[0.04] transition-colors"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E] hover:bg-gray-50 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-3 rounded-xl text-sm font-semibold text-[#6C63FF] hover:bg-[#6C63FF]/[0.04] transition-colors"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
