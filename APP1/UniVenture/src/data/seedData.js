// ========================================
// seedData.js - All our data and helper functions
// This file handles localStorage (our "database")
// ========================================

// --- 6 Sample Startups (shown on first load) ---
const SAMPLE_STARTUPS = [
  {
    id: 'startup-1',
    title: 'Scale AI',
    authorName: 'Ramkrishna Swarnkar',
    authorId: 'user-seed-1',
    category: 'Artificial Intelligence',
    description: 'Accelerates the development of AI applications by providing high-quality training data and annotation services.',
    problem: 'AI companies struggle with getting good training data. Manual labeling is expensive and slow.',
    solution: 'We provide a smart data labeling platform that combines humans and AI for 99.5% accuracy.',
    market: 'The AI training data market will reach $8.2 billion by 2028.',
    funding: '$500,000',
    date: '2024-12-04',
    views: 69,
    likes: 42,
    likedBy: []
  },
  {
    id: 'startup-2',
    title: 'Harvey',
    authorName: 'Ramkrishna Swarnkar',
    authorId: 'user-seed-1',
    category: 'LegalTech',
    description: 'Provides legal AI solutions to automate document review and deliver insights for law firms.',
    problem: 'Lawyers spend 60% of time on repetitive tasks like document review and research.',
    solution: 'Harvey uses large language models to automate contract review and legal research.',
    market: 'The legal tech market will reach $25 billion by 2027.',
    funding: '$350,000',
    date: '2024-12-04',
    views: 35,
    likes: 28,
    likedBy: []
  },
  {
    id: 'startup-3',
    title: 'Midjourney',
    authorName: 'Ramkrishna Swarnkar',
    authorId: 'user-seed-1',
    category: 'Creative AI',
    description: 'An independent research lab exploring new mediums of thought through generative AI art.',
    problem: 'Creating visual content requires years of design training or expensive artists.',
    solution: 'Our AI transforms text prompts into stunning images in seconds.',
    market: 'The AI art market will exceed $10 billion by 2028.',
    funding: '$200,000',
    date: '2024-12-04',
    views: 21,
    likes: 19,
    likedBy: []
  },
  {
    id: 'startup-4',
    title: 'Notion AI',
    authorName: 'Priya Sharma',
    authorId: 'user-seed-2',
    category: 'Productivity',
    description: 'An all-in-one workspace that combines notes, docs, wikis, and project management with AI.',
    problem: 'Teams use 9+ different tools causing context switching and lost information.',
    solution: 'Notion AI puts docs, databases, and boards in one smart workspace.',
    market: 'The productivity software market is $60 billion and growing.',
    funding: '$750,000',
    date: '2024-12-03',
    views: 88,
    likes: 61,
    likedBy: []
  },
  {
    id: 'startup-5',
    title: 'Vercel',
    authorName: 'Alex Chen',
    authorId: 'user-seed-3',
    category: 'Developer Tools',
    description: 'The platform for frontend developers, providing speed and reliability for web projects.',
    problem: 'Deploying websites is too complex. Developers waste hours on server setup.',
    solution: 'Push code to Git and Vercel handles everything — build, deploy, and scale.',
    market: 'The developer tools market is growing at 20% annually.',
    funding: '$400,000',
    date: '2024-12-03',
    views: 54,
    likes: 37,
    likedBy: []
  },
  {
    id: 'startup-6',
    title: 'Linear',
    authorName: 'Sofia Rodriguez',
    authorId: 'user-seed-4',
    category: 'Project Management',
    description: 'The issue tracking tool built for high-performance teams. Fast, simple, beautiful.',
    problem: 'Tools like Jira are bloated and slow. Teams waste time navigating complex interfaces.',
    solution: 'Linear is a fast, keyboard-first issue tracker that helps teams ship 2x faster.',
    market: 'The project management market is worth $7 billion.',
    funding: '$300,000',
    date: '2024-12-02',
    views: 47,
    likes: 33,
    likedBy: []
  }
];

// --- 4 Sample Users ---
const SAMPLE_USERS = [
  {
    id: 'user-seed-1',
    name: 'Ramkrishna Swarnkar',
    email: 'ramkrishna@example.com',
    password: 'password123',
    role: 'Entrepreneur',
    bio: 'Passionate about AI and legal technology.',
    skills: ['AI/ML', 'Product Strategy', 'Fundraising'],
    savedStartups: [],
    collaborationRequests: []
  },
  {
    id: 'user-seed-2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    role: 'Developer',
    bio: 'Full-stack developer and productivity enthusiast.',
    skills: ['React', 'Node.js', 'Python'],
    savedStartups: [],
    collaborationRequests: []
  },
  {
    id: 'user-seed-3',
    name: 'Alex Chen',
    email: 'alex@example.com',
    password: 'password123',
    role: 'Developer',
    bio: 'Frontend developer and open-source contributor.',
    skills: ['JavaScript', 'React', 'Next.js'],
    savedStartups: [],
    collaborationRequests: []
  },
  {
    id: 'user-seed-4',
    name: 'Sofia Rodriguez',
    email: 'sofia@example.com',
    password: 'password123',
    role: 'Designer',
    bio: 'UX designer turned product manager.',
    skills: ['UX Design', 'Figma', 'User Research'],
    savedStartups: [],
    collaborationRequests: []
  }
];

// ========================================
// localStorage Functions (like a simple database)
// ========================================

// Run once on first visit — fills localStorage with sample data
export function initSeedData() {
  if (!localStorage.getItem('univenture_initialized')) {
    localStorage.setItem('univenture_startups', JSON.stringify(SAMPLE_STARTUPS));
    localStorage.setItem('univenture_users', JSON.stringify(SAMPLE_USERS));
    localStorage.setItem('univenture_initialized', 'true');
  }
}

// Get all startups from localStorage
export function getStartups() {
  const data = localStorage.getItem('univenture_startups');
  return data ? JSON.parse(data) : [];
}

// Save startups array to localStorage
export function saveStartups(startups) {
  localStorage.setItem('univenture_startups', JSON.stringify(startups));
}

// Get all users from localStorage
export function getUsers() {
  const data = localStorage.getItem('univenture_users');
  return data ? JSON.parse(data) : [];
}

// Save users array to localStorage
export function saveUsers(users) {
  localStorage.setItem('univenture_users', JSON.stringify(users));
}

// Get the currently logged-in user
export function getCurrentUser() {
  const data = localStorage.getItem('univenture_currentUser');
  return data ? JSON.parse(data) : null;
}

// Set (or clear) the currently logged-in user
export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('univenture_currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('univenture_currentUser');
  }
}

// ========================================
// Categories list (used in filters and forms)
// ========================================
export const CATEGORIES = [
  'All', 'Artificial Intelligence', 'Fintech', 'HealthTech', 'EdTech',
  'LegalTech', 'Developer Tools', 'Productivity', 'Creative AI',
  'Project Management', 'E-Commerce'
];

// Colors for each category badge
export const CATEGORY_COLORS = {
  'Artificial Intelligence': { bg: '#DBEAFE', text: '#2563EB' },
  'Fintech': { bg: '#FEF3C7', text: '#D97706' },
  'HealthTech': { bg: '#CCFBF1', text: '#0D9488' },
  'EdTech': { bg: '#FEF9C3', text: '#CA8A04' },
  'LegalTech': { bg: '#0D3B66', text: '#FFFFFF' },
  'Developer Tools': { bg: '#D1FAE5', text: '#059669' },
  'Productivity': { bg: '#F3E8FF', text: '#7C3AED' },
  'Creative AI': { bg: '#FEE2E2', text: '#DC2626' },
  'Project Management': { bg: '#FFE0E6', text: '#E11D48' },
  'E-Commerce': { bg: '#FCE7F3', text: '#DB2777' }
};

// ========================================
// Avatar Helper Functions
// ========================================

// Get initials from a name (e.g., "John Doe" → "JD")
export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Get a consistent color for a user's avatar based on their name
const AVATAR_COLORS = ['#1A1A2E', '#2D3436', '#6C5CE7', '#00B894', '#E17055',
  '#0984E3', '#D63031', '#FDCB6E', '#00CEC9', '#E84393'];

export function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
