// ========================================
// helpers.js — Utility functions
// ========================================

// Generate unique IDs
export function generateId() {
  return 'startup-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// Generate initials avatar color from name
export function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 65%, 55%)`;
}

// Get initials from name
export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Format currency
export function formatFunding(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

// Relative time
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}

// Domain metadata
export function getDomainInfo(domain) {
  const DOMAIN_MAP = {
    'AI/ML': { color: '#6C63FF', gradient: 'from-violet-500 to-purple-600' },
    'FinTech': { color: '#FFB800', gradient: 'from-amber-400 to-orange-500' },
    'HealthTech': { color: '#00E676', gradient: 'from-emerald-400 to-green-500' },
    'EdTech': { color: '#00D9FF', gradient: 'from-cyan-400 to-blue-500' },
    'E-Commerce': { color: '#FF4D6A', gradient: 'from-rose-400 to-pink-500' },
    'CleanTech': { color: '#4CAF50', gradient: 'from-green-400 to-emerald-500' },
  };

  return DOMAIN_MAP[domain] || { color: '#6C63FF', gradient: 'from-violet-500 to-purple-600' };
}
