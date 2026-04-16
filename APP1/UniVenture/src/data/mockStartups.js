// ========================================
// mockStartups.js — Seed data for UniVenture
// 12 startups across 6 domains
// ========================================

export const DOMAINS = [
  { name: 'AI/ML', icon: 'AI', color: '#6C63FF' },
  { name: 'FinTech', icon: 'FT', color: '#FFB800' },
  { name: 'HealthTech', icon: 'HT', color: '#00E676' },
  { name: 'EdTech', icon: 'ET', color: '#00D9FF' },
  { name: 'E-Commerce', icon: 'EC', color: '#FF4D6A' },
  { name: 'CleanTech', icon: 'CT', color: '#4CAF50' },
];

export const ROLE_OPTIONS = [
  'Developer', 'Designer', 'Marketer', 'Business', 'Data Scientist', 'Content Writer'
];

export const MARKET_SIZES = ['<₹10Cr', '₹10-100Cr', '₹100Cr+'];

export const FUNDING_TYPES = ['Equity', 'Grant', 'Revenue Share'];

export const REVENUE_MODELS = [
  'SaaS Subscription', 'Freemium', 'Marketplace Commission',
  'Advertising', 'Transaction Fee', 'Licensing', 'Other'
];

const SAMPLE_STARTUPS = [
  {
    id: 'startup-001',
    title: 'EduBot AI',
    tagline: 'Personalized tutoring powered by AI for tier-2 India',
    domain: 'EdTech',
    tags: ['AI', 'B2C', 'Education'],
    problem: 'Over 70% of students in tier-2 and tier-3 cities lack access to quality tutoring. Private tutors are expensive and often unavailable in these areas, creating a massive education gap.',
    solution: 'EduBot AI uses advanced NLP and machine learning to create personalized learning paths for each student. Our chatbot tutor adapts to learning speed, identifies weak areas, and provides instant doubt-solving in Hindi and English.',
    market: 'The Indian EdTech market is projected to reach $30 billion by 2030. With 260 million school-age children and only 5% having access to quality tutoring, the addressable market is enormous.',
    traction: '12,000 active users, 85% retention rate, partnerships with 15 schools in Rajasthan and UP. Featured in YourStory and EdTech Review.',
    fundingAsk: 2000000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'Freemium',
    votes: 127,
    views: 892,
    comments: [
      { id: 'c1', author: 'Vikram M', text: 'Love the regional language support! This is what India needs.', date: '2024-01-18T10:00:00Z' },
      { id: 'c2', author: 'Sneha R', text: 'How do you plan to handle offline areas with poor internet?', date: '2024-01-19T14:00:00Z' }
    ],
    saves: 45,
    rolesNeeded: ['Developer', 'Designer'],
    founders: [
      { name: 'Priya Sharma', college: 'IIT Kanpur', role: 'CEO' },
      { name: 'Arjun Mehta', college: 'IIT Kanpur', role: 'CTO' }
    ],
    contactEmail: 'priya@edubot.ai',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    postedAt: '2024-01-15T10:30:00Z',
    isTrending: true
  },
  {
    id: 'startup-002',
    title: 'PaySetu',
    tagline: 'UPI-based micro-lending for street vendors and small shops',
    domain: 'FinTech',
    tags: ['UPI', 'Micro-lending', 'B2B'],
    problem: 'Over 10 million street vendors in India have zero access to formal credit. Banks reject them due to lack of documentation, forcing them into the debt trap of informal money lenders charging 5-10% monthly interest.',
    solution: 'PaySetu analyzes UPI transaction history to build creditworthiness scores for vendors. We offer instant micro-loans of ₹5,000-₹50,000 with transparent interest rates, repayable through daily UPI collections.',
    market: 'The micro-lending market in India is valued at $12 billion and growing at 25% annually. Street vendors alone represent a $3 billion opportunity.',
    traction: '2,500 vendors onboarded in Pune, ₹1.2Cr disbursed, 97% repayment rate. Partnership with SBI for credit line.',
    fundingAsk: 5000000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'Transaction Fee',
    votes: 89,
    views: 654,
    comments: [
      { id: 'c3', author: 'Rajesh K', text: 'This is solving a real problem. The 97% repayment rate is impressive!', date: '2024-01-20T09:00:00Z' }
    ],
    saves: 32,
    rolesNeeded: ['Developer', 'Data Scientist'],
    founders: [
      { name: 'Aditya Kulkarni', college: 'BITS Pilani', role: 'CEO' },
      { name: 'Meera Joshi', college: 'BITS Pilani', role: 'CFO' }
    ],
    contactEmail: 'aditya@paysetu.in',
    demoVideo: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    postedAt: '2024-01-12T08:00:00Z',
    isTrending: true
  },
  {
    id: 'startup-003',
    title: 'MediFind',
    tagline: 'AI-powered symptom checker + nearest doctor finder',
    domain: 'HealthTech',
    tags: ['AI', 'Healthcare', 'B2C'],
    problem: 'In India, there is only 1 doctor per 1,445 patients. Rural patients travel 50+ km to find a doctor, often misdiagnosing their own symptoms and delaying critical treatment.',
    solution: 'MediFind combines an AI symptom analysis engine with a geo-located doctor directory. Users describe symptoms in their local language, get a preliminary analysis, and find the nearest verified doctor with real-time availability.',
    market: 'India\'s digital health market will reach $21 billion by 2025. With 900 million smartphone users and growing health awareness, the opportunity is massive.',
    traction: '50,000 symptom checks completed, 3,000 doctors listed in Maharashtra and Karnataka. 4.5-star rating on Play Store.',
    fundingAsk: 3000000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'Freemium',
    votes: 156,
    views: 1203,
    comments: [
      { id: 'c4', author: 'Dr. Ananya', text: 'As a doctor, I appreciate the responsible AI approach with disclaimers.', date: '2024-01-16T11:00:00Z' },
      { id: 'c5', author: 'Rahul S', text: 'The local language support is a game changer for rural areas.', date: '2024-01-17T16:00:00Z' }
    ],
    saves: 67,
    rolesNeeded: ['Designer', 'Marketer'],
    founders: [
      { name: 'Kavya Nair', college: 'AIIMS Delhi', role: 'CEO' },
      { name: 'Rohit Patil', college: 'IIT Bombay', role: 'CTO' }
    ],
    contactEmail: 'kavya@medifind.health',
    demoVideo: 'https://www.youtube.com/embed/9bZkp7q19f0',
    postedAt: '2024-01-10T12:00:00Z',
    isTrending: true
  },
  {
    id: 'startup-004',
    title: 'CartNinja',
    tagline: 'AI shopping assistant that finds the best deals across platforms',
    domain: 'E-Commerce',
    tags: ['AI', 'B2C', 'Price Comparison'],
    problem: 'Indian shoppers waste an average of 45 minutes comparing prices across Amazon, Flipkart, Myntra, and other platforms. They often miss better deals or coupon codes.',
    solution: 'CartNinja is a browser extension + mobile app that instantly compares prices across 15+ platforms, tracks price history, applies the best coupon codes, and alerts users when prices drop for wishlisted items.',
    market: 'Indian e-commerce market is $83 billion and growing. Price-conscious buyers make up 78% of online shoppers, creating a massive market for deal discovery.',
    traction: '75,000 browser extension installs, 20,000 DAU, ₹15 lakh in affiliate revenue. Featured in TechCrunch India.',
    fundingAsk: 1500000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'Marketplace Commission',
    votes: 72,
    views: 489,
    comments: [
      { id: 'c6', author: 'Amit P', text: 'Saved ₹3,000 on my laptop purchase using this! Amazing tool.', date: '2024-01-22T10:00:00Z' }
    ],
    saves: 28,
    rolesNeeded: ['Developer', 'Marketer'],
    founders: [
      { name: 'Deepak Verma', college: 'NIT Trichy', role: 'CEO' }
    ],
    contactEmail: 'deepak@cartninja.co',
    postedAt: '2024-01-08T14:00:00Z',
    isTrending: false
  },
  {
    id: 'startup-005',
    title: 'GreenGrid',
    tagline: 'Smart solar micro-grids for rural Indian villages',
    domain: 'CleanTech',
    tags: ['Solar', 'IoT', 'Impact'],
    problem: 'Over 30 million Indian households lack reliable electricity. Existing grid infrastructure is unreliable in rural areas with 6-8 hour daily power cuts, affecting livelihoods and education.',
    solution: 'GreenGrid deploys modular solar micro-grids with IoT monitoring. Our pay-per-use model lets villages access clean energy without upfront costs. Smart batteries store excess power for nighttime use.',
    market: 'The rural energy market in India is a $50 billion opportunity. Government schemes like PM-KUSUM provide additional subsidy support for solar adoption.',
    traction: '15 villages electrified in Bihar, 5,000 households served, 40% reduction in energy costs for users. Recognized by NITI Aayog.',
    fundingAsk: 8000000,
    fundingType: 'Grant',
    marketSize: '₹100Cr+',
    revenueModel: 'SaaS Subscription',
    votes: 98,
    views: 567,
    comments: [
      { id: 'c7', author: 'Sunita D', text: 'This is the kind of impact project India needs. How can I volunteer?', date: '2024-01-14T08:00:00Z' },
      { id: 'c8', author: 'Ravi M', text: 'Have you considered partnering with NABARD for financing?', date: '2024-01-15T12:00:00Z' }
    ],
    saves: 41,
    rolesNeeded: ['Business', 'Content Writer'],
    founders: [
      { name: 'Ankit Singh', college: 'IIT Delhi', role: 'CEO' },
      { name: 'Neha Gupta', college: 'TERI University', role: 'COO' }
    ],
    contactEmail: 'ankit@greengrid.in',
    demoVideo: 'https://www.youtube.com/embed/L_jWHffIx5E',
    postedAt: '2024-01-05T09:00:00Z',
    isTrending: true
  },
  {
    id: 'startup-006',
    title: 'CodeMentor AI',
    tagline: 'AI pair programmer that teaches you while it codes with you',
    domain: 'AI/ML',
    tags: ['AI', 'Developer Tools', 'SaaS'],
    problem: 'Junior developers spend 3+ hours daily on Stack Overflow and documentation. Existing AI coding tools write code for you but don\'t explain the WHY, creating a dependency rather than learning.',
    solution: 'CodeMentor AI is a VS Code extension that acts as a teaching pair programmer. It explains code concepts in context, suggests improvements with reasoning, and adapts its teaching style to your skill level.',
    market: 'The developer tools market is $45 billion globally. With 28 million developers worldwide seeking continuous learning, the AI coding education segment is projected to reach $5 billion by 2026.',
    traction: '8,000 VS Code installs, 4.8-star rating, 60% weekly active users. Partnership with freeCodeCamp for distribution.',
    fundingAsk: 3500000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'SaaS Subscription',
    votes: 203,
    views: 1567,
    comments: [
      { id: 'c9', author: 'Karan J', text: 'Finally! An AI tool that actually teaches instead of just autocompleting.', date: '2024-01-13T15:00:00Z' },
      { id: 'c10', author: 'Lisa W', text: 'Would love to see Python support. Currently only JS/TS?', date: '2024-01-14T09:00:00Z' }
    ],
    saves: 89,
    rolesNeeded: ['Developer', 'Data Scientist'],
    founders: [
      { name: 'Siddharth Rao', college: 'IIIT Hyderabad', role: 'CEO' },
      { name: 'Tanvi Deshmukh', college: 'IIIT Hyderabad', role: 'CTO' }
    ],
    contactEmail: 'sid@codementorai.dev',
    demoVideo: 'https://www.youtube.com/embed/aircAruvnKk',
    postedAt: '2024-01-03T11:00:00Z',
    isTrending: true
  },
  {
    id: 'startup-007',
    title: 'FarmConnect',
    tagline: 'Direct farm-to-consumer marketplace eliminating middlemen',
    domain: 'E-Commerce',
    tags: ['AgriTech', 'Marketplace', 'B2C'],
    problem: 'Indian farmers receive only 15-20% of the final consumer price. Multiple middlemen in the supply chain eat into margins, while consumers pay inflated prices for stale produce.',
    solution: 'FarmConnect is a mobile marketplace connecting farmers directly to urban consumers and restaurants. Our cold-chain logistics network ensures produce reaches buyers within 12 hours of harvest.',
    market: 'India\'s agriculture market is $370 billion. The farm-to-fork direct delivery segment is growing at 35% annually with increasing urban demand for fresh produce.',
    traction: '500 farmers, 15,000 consumers in Bangalore. Average farmer income increased 40%. Processing 2,000 orders/week.',
    fundingAsk: 4000000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'Marketplace Commission',
    votes: 64,
    views: 423,
    comments: [
      { id: 'c11', author: 'Farmer Raju', text: 'I\'m earning 3x more since joining FarmConnect. Thank you!', date: '2024-01-21T07:00:00Z' }
    ],
    saves: 19,
    rolesNeeded: ['Marketer', 'Business'],
    founders: [
      { name: 'Vikram Reddy', college: 'IIM Bangalore', role: 'CEO' }
    ],
    contactEmail: 'vikram@farmconnect.in',
    postedAt: '2024-01-01T06:00:00Z',
    isTrending: false
  },
  {
    id: 'startup-008',
    title: 'MindSpace',
    tagline: 'Anonymous mental health support platform for college students',
    domain: 'HealthTech',
    tags: ['Mental Health', 'B2C', 'Community'],
    problem: '1 in 3 Indian college students report anxiety or depression, but only 10% seek help due to stigma. College counselors are overwhelmed with 1:5000 counselor-to-student ratios.',
    solution: 'MindSpace offers anonymous peer support circles, AI-guided self-help modules, and affordable teletherapy sessions. Our gamified wellness tracking keeps students engaged with their mental health journey.',
    market: 'The mental health tech market in India is growing at 30% CAGR. With 40 million college students and increasing awareness, the addressable market exceeds $2 billion.',
    traction: '25,000 students across 50 colleges, 90% report improved wellbeing. Supported by WHO India and NIMHANS.',
    fundingAsk: 2500000,
    fundingType: 'Grant',
    marketSize: '₹10-100Cr',
    revenueModel: 'Freemium',
    votes: 112,
    views: 876,
    comments: [
      { id: 'c12', author: 'Anonymous', text: 'This platform literally saved me during exam season. The peer circles are amazing.', date: '2024-01-11T20:00:00Z' },
      { id: 'c13', author: 'Prof. Desai', text: 'We\'ve seen a 30% increase in students seeking help since deploying MindSpace at our college.', date: '2024-01-12T10:00:00Z' }
    ],
    saves: 56,
    rolesNeeded: ['Designer', 'Content Writer'],
    founders: [
      { name: 'Isha Kapoor', college: 'Delhi University', role: 'CEO' },
      { name: 'Aryan Malhotra', college: 'Delhi University', role: 'CTO' },
      { name: 'Zara Khan', college: 'TISS Mumbai', role: 'Head of Psychology' }
    ],
    contactEmail: 'isha@mindspace.care',
    postedAt: '2024-01-09T15:00:00Z',
    isTrending: true
  },
  {
    id: 'startup-009',
    title: 'SkillBridge',
    tagline: 'Connecting college students with real-world micro-projects',
    domain: 'EdTech',
    tags: ['Gig Economy', 'B2B2C', 'Hiring'],
    problem: '76% of engineering graduates are unemployable due to lack of practical experience. Internships are hard to get and often involve menial tasks rather than real learning.',
    solution: 'SkillBridge breaks down real company projects into micro-tasks matched to student skill levels. Students build portfolios with verified project work, and companies get quality work at affordable rates.',
    market: 'The skills gap costs Indian companies $12 billion annually. With 10 million graduates/year seeking practical experience, the opportunity is significant.',
    traction: '3,000 students, 200 companies, 1,500 projects completed. Average student earns ₹15,000/month part-time.',
    fundingAsk: 1800000,
    fundingType: 'Equity',
    marketSize: '₹10-100Cr',
    revenueModel: 'Marketplace Commission',
    votes: 78,
    views: 534,
    comments: [
      { id: 'c14', author: 'Neha S', text: 'Got my first freelance client through SkillBridge. The mentorship is great!', date: '2024-01-19T13:00:00Z' }
    ],
    saves: 33,
    rolesNeeded: ['Developer', 'Designer', 'Marketer'],
    founders: [
      { name: 'Rahul Bose', college: 'NIT Warangal', role: 'CEO' },
      { name: 'Prachi Tiwari', college: 'NIT Warangal', role: 'CPO' }
    ],
    contactEmail: 'rahul@skillbridge.work',
    postedAt: '2024-01-07T10:00:00Z',
    isTrending: false
  },
  {
    id: 'startup-010',
    title: 'CarbonZero',
    tagline: 'Gamified carbon footprint tracker for conscious consumers',
    domain: 'CleanTech',
    tags: ['Sustainability', 'Gamification', 'B2C'],
    problem: 'Individuals contribute 72% of global emissions through consumption choices, but have no easy way to measure or reduce their carbon footprint in meaningful ways.',
    solution: 'CarbonZero tracks your daily carbon emissions through linked bank transactions and lifestyle inputs. Gamified challenges, community leaderboards, and verified offset purchases make sustainability engaging.',
    market: 'The voluntary carbon market is expected to reach $50 billion by 2030. ESG-conscious consumers aged 18-35 are willing to pay 15% premiums for sustainable alternatives.',
    traction: '40,000 users, 500 tons of CO2 offset, partnerships with 30 sustainable brands. Featured in Vogue India and Forbes.',
    fundingAsk: 1200000,
    fundingType: 'Revenue Share',
    marketSize: '₹10-100Cr',
    revenueModel: 'Freemium',
    votes: 91,
    views: 678,
    comments: [
      { id: 'c15', author: 'Eco Warrior', text: 'Love the gamification aspect. Makes sustainability fun instead of guilt-tripping.', date: '2024-01-17T18:00:00Z' }
    ],
    saves: 37,
    rolesNeeded: ['Developer', 'Designer'],
    founders: [
      { name: 'Maya Krishnan', college: 'IISc Bangalore', role: 'CEO' }
    ],
    contactEmail: 'maya@carbonzero.earth',
    postedAt: '2024-01-06T08:00:00Z',
    isTrending: false
  },
  {
    id: 'startup-011',
    title: 'WealthWise',
    tagline: 'AI financial advisor for first-generation investors in India',
    domain: 'FinTech',
    tags: ['AI', 'Investment', 'B2C'],
    problem: 'Only 3% of Indians invest in the stock market. First-generation investors are confused by jargon, overwhelmed by choices, and fall prey to social media "finfluencers" giving bad advice.',
    solution: 'WealthWise uses AI to create personalized investment plans based on income, goals, and risk tolerance. Simple vernacular language explanations, automated SIP management, and SEBI-registered advisory make investing accessible.',
    market: 'India has 80 million demat accounts but 300 million potential investors. The wealth management market is $1.5 trillion with massive room for digital disruption.',
    traction: '15,000 users, ₹8Cr AUM, NPS score of 72. SEBI RIA registration approved.',
    fundingAsk: 6000000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'SaaS Subscription',
    votes: 145,
    views: 987,
    comments: [
      { id: 'c16', author: 'First Timer', text: 'Started my first SIP through WealthWise. The explanations made it so easy to understand!', date: '2024-01-20T11:00:00Z' },
      { id: 'c17', author: 'Finance Prof', text: 'This is responsible fintech done right. Love the educational approach.', date: '2024-01-21T14:00:00Z' }
    ],
    saves: 52,
    rolesNeeded: ['Data Scientist', 'Marketer'],
    founders: [
      { name: 'Karthik Iyer', college: 'IIM Ahmedabad', role: 'CEO' },
      { name: 'Shreya Ghosh', college: 'ISB Hyderabad', role: 'CTO' }
    ],
    contactEmail: 'karthik@wealthwise.co.in',
    demoVideo: 'https://www.youtube.com/embed/JGwWNGJdvx8',
    postedAt: '2024-01-04T07:00:00Z',
    isTrending: true
  },
  {
    id: 'startup-012',
    title: 'NeuraLens',
    tagline: 'Computer vision platform for real-time manufacturing quality control',
    domain: 'AI/ML',
    tags: ['Computer Vision', 'B2B', 'Manufacturing'],
    problem: 'Indian manufacturers lose $8 billion annually to quality defects. Manual inspection catches only 70% of defects and is slow, subjective, and expensive at scale.',
    solution: 'NeuraLens deploys edge-AI cameras on production lines that detect defects in real-time with 99.2% accuracy. Our no-code platform lets factory managers configure inspection rules without ML expertise.',
    market: 'The industrial AI inspection market is $3.5 billion globally, growing at 22% CAGR. India\'s Make-in-India push creates additional tailwinds for manufacturing quality solutions.',
    traction: '12 factory deployments, 2 million items inspected, 99.2% accuracy. Customers include Tata Steel and Mahindra.',
    fundingAsk: 10000000,
    fundingType: 'Equity',
    marketSize: '₹100Cr+',
    revenueModel: 'SaaS Subscription',
    votes: 134,
    views: 756,
    comments: [
      { id: 'c18', author: 'Factory Owner', text: 'Reduced our defect rate by 85% in just 2 months. ROI is incredible.', date: '2024-01-16T09:00:00Z' }
    ],
    saves: 44,
    rolesNeeded: ['Business', 'Marketer'],
    founders: [
      { name: 'Vivek Choudhary', college: 'IIT Madras', role: 'CEO' },
      { name: 'Ananya Bhatt', college: 'IIT Madras', role: 'CTO' }
    ],
    contactEmail: 'vivek@neuralens.ai',
    postedAt: '2024-01-02T13:00:00Z',
    isTrending: true
  }
];

// ========================================
// Default user profile
// ========================================
export const DEFAULT_USER = {
  id: 'user-001',
  name: 'Ayush Singh',
  college: 'IIT Delhi',
  role: 'Entrepreneur',
  bio: 'Building the future, one pitch at a time. Passionate about AI and social impact.',
  email: 'ayush@univenture.com',
  github: 'github.com/ayush',
  linkedin: 'linkedin.com/in/ayush',
  twitter: '@ayush_builds',
  savedStartups: ['startup-003', 'startup-006', 'startup-008'],
  votedStartups: ['startup-001', 'startup-003', 'startup-006'],
};

// ========================================
// Sample collaboration requests
// ========================================
export const SAMPLE_REQUESTS = [
  { id: 'req-1', personName: 'Rohit Patil', role: 'Developer', pitchTitle: 'MediFind', status: 'pending', date: '2024-01-20' },
  { id: 'req-2', personName: 'Sneha Gupta', role: 'Designer', pitchTitle: 'EduBot AI', status: 'pending', date: '2024-01-19' },
  { id: 'req-3', personName: 'Karan Jha', role: 'Marketer', pitchTitle: 'CodeMentor AI', status: 'accepted', date: '2024-01-18' },
];

// ========================================
// Sample activity feed
// ========================================
export const SAMPLE_ACTIVITY = [
  { id: 'act-1', type: 'vote', text: 'Someone upvoted EduBot AI', time: '2 hours ago', icon: '🔼' },
  { id: 'act-2', type: 'comment', text: 'New comment on MediFind', time: '5 hours ago', icon: '💬' },
  { id: 'act-3', type: 'save', text: 'Your pitch was saved by 3 people', time: '1 day ago', icon: '🔖' },
  { id: 'act-4', type: 'team', text: 'Karan Jha joined as Marketer', time: '2 days ago', icon: '🤝' },
  { id: 'act-5', type: 'trending', text: 'CodeMentor AI is trending! 🔥', time: '3 days ago', icon: '📈' },
];

// ========================================
// localStorage helpers
// ========================================
export function initData() {
  const DATA_VERSION = 'v2-demo-videos';
  if (localStorage.getItem('uv_version') !== DATA_VERSION) {
    localStorage.setItem('uv_startups', JSON.stringify(SAMPLE_STARTUPS));
    localStorage.setItem('uv_user', JSON.stringify(DEFAULT_USER));
    localStorage.setItem('uv_requests', JSON.stringify(SAMPLE_REQUESTS));
    localStorage.setItem('uv_activity', JSON.stringify(SAMPLE_ACTIVITY));
    localStorage.setItem('uv_version', DATA_VERSION);
  }
}

export function getStartups() {
  const data = localStorage.getItem('uv_startups');
  return data ? JSON.parse(data) : SAMPLE_STARTUPS;
}

export function saveStartups(startups) {
  localStorage.setItem('uv_startups', JSON.stringify(startups));
}

export function getUser() {
  const data = localStorage.getItem('uv_user');
  return data ? JSON.parse(data) : DEFAULT_USER;
}

export function saveUser(user) {
  localStorage.setItem('uv_user', JSON.stringify(user));
}

export function getRequests() {
  const data = localStorage.getItem('uv_requests');
  return data ? JSON.parse(data) : SAMPLE_REQUESTS;
}

export function saveRequests(requests) {
  localStorage.setItem('uv_requests', JSON.stringify(requests));
}

export function getActivity() {
  const data = localStorage.getItem('uv_activity');
  return data ? JSON.parse(data) : SAMPLE_ACTIVITY;
}
