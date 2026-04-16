// ========================================
// helpers.js — Utility functions
// ========================================

// Get initials from name ("Priya Sharma" → "PS")
export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Consistent avatar color from name
const AVATAR_COLORS = [
  '#6C63FF', '#00D9FF', '#FF4D6A', '#00E676', '#FFB800',
  '#E040FB', '#FF6E40', '#448AFF', '#69F0AE', '#FF4081'
];

export function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// Format currency (2000000 → "₹20L")
export function formatFunding(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

// Time ago string ("2024-01-15T10:30:00Z" → "3 days ago")
export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

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
  return 'Just now';
}

// Generate a unique ID
export function generateId() {
  return 'startup-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

// Truncate text with ellipsis
export function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

// Domain info lookup
const DOMAIN_MAP = {
  'AI/ML': { emoji: '🤖', color: '#6C63FF', gradient: 'from-violet-500 to-purple-600' },
  'FinTech': { emoji: '💳', color: '#FFB800', gradient: 'from-amber-400 to-orange-500' },
  'HealthTech': { emoji: '🏥', color: '#00E676', gradient: 'from-emerald-400 to-green-500' },
  'EdTech': { emoji: '📚', color: '#00D9FF', gradient: 'from-cyan-400 to-blue-500' },
  'E-Commerce': { emoji: '🛒', color: '#FF4D6A', gradient: 'from-rose-400 to-pink-500' },
  'CleanTech': { emoji: '🌱', color: '#4CAF50', gradient: 'from-green-400 to-emerald-500' },
};

export function getDomainInfo(domain) {
  return DOMAIN_MAP[domain] || { emoji: '💡', color: '#6C63FF', gradient: 'from-violet-500 to-purple-600' };
}
