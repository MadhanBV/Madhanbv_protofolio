export const PERSONAL_INFO = {
  name: 'MADHAN BV',
  title: 'Computer Science Engineering Student',
  university: 'Presidency University',
  email: 'madhanbv.cse@gmail.com',
  resume: '#',
  tagline: 'Engineering ideas into meaningful digital experiences.',
  socials: {
    github: 'https://github.com/MadhanBV',
    linkedin: 'https://www.linkedin.com/in/madhanbv/',
    instagram: 'https://www.instagram.com/madhan_b_v/',
  },
  profileImage: '/images/madhan-profile.jpg',
};

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Lab' },
  { id: 'about', label: 'About' },
  { id: 'currently-building', label: 'Building' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'research', label: 'Research' },
  { id: 'tech-stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const ROTATING_ROLES = [
  'Full-Stack Developer',
  'Design Thinker',
  'Research Enthusiast',
  'Startup Aspirant',
  'Blockchain Explorer',
];

export const LAB_STATS = [
  { label: 'Core Projects', value: 3, suffix: '+' },
  { label: 'Tech Domains', value: 6, suffix: '+' },
  { label: 'Hackathons', value: 3, suffix: '+' },
  { label: 'Focus Areas', value: 8, suffix: '' },
];

export const ABOUT_CONTENT = {
  description:
    'Computer Science and Engineering undergraduate at Presidency University with a strong interest in technology, innovation, and entrepreneurship.',
  details: [
    'Curious learner exploring full-stack web development, scalable systems, blockchain technologies, UI/UX design, and product-focused engineering.',
    'Co-Founder of EV LOWARAGE, an EV charging solution initiative focused on sustainable mobility and innovation.',
    'Passionate about solving real-world problems through technology, design thinking, and impactful digital experiences.',
    'Focused on building polished, accessible products that turn complex technical ideas into usable workflows.',
  ],
  badges: [
    'Full Stack',
    'Blockchain',
    'UI/UX',
    'Design Thinking',
    'Entrepreneurship',
    'Innovation',
    'Systems Thinking',
    'Product Engineering',
  ],
};

export const CURRENTLY_BUILDING = [
  {
    title: 'Learning Python',
    description: 'Data structures, automation, and backend foundations.',
    iconKey: 'python',
    progress: 72,
  },
  {
    title: 'Scalable Web Systems',
    description: 'Distributed systems, APIs, and production-ready patterns.',
    iconKey: 'systems',
    progress: 64,
  },
  {
    title: 'Blockchain Experiments',
    description: 'Wallet flows, transparent settlement, and decentralized storage.',
    iconKey: 'blockchain',
    progress: 68,
  },
  {
    title: 'UI/UX Prototyping',
    description: 'Design systems, interaction models, and user flows.',
    iconKey: 'design',
    progress: 80,
  },
  {
    title: 'Product Development',
    description: 'Turning campus problems into measurable product concepts.',
    iconKey: 'product',
    progress: 76,
  },
  {
    title: 'Startup Innovation',
    description: 'EV charging, sustainability, and practical venture experiments.',
    iconKey: 'startup',
    progress: 70,
  },
] as const;

export type ProjectMetric = {
  label: string;
  value: string;
  tone: 'cyan' | 'purple' | 'emerald' | 'amber';
};

export type Project = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  tech: string[];
  thumbnail: string;
  liveLink?: string;
  demoVideo?: string;
  images?: string[];
  challenges: string[];
  solutions: string[];
  learnings: string[];
  metrics: ProjectMetric[];
  milestones: { label: string; detail: string }[];
  architecture: string[];
  codeSnippet: string;
  accent: 'cyan' | 'purple' | 'blue' | 'emerald' | 'amber';
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Web3 YouTube Decentralized Platform',
    shortDescription:
      'Decentralized creator platform with transparent ad-backed reward systems.',
    fullDescription:
      'Built a decentralized ad-based video platform where creators upload content, viewers engage with videos, and advertisers fund campaigns through transparent blockchain reward distribution.',
    features: [
      'Wallet authentication with Pera Wallet integration',
      'IPFS storage for distributed content',
      'FastAPI backend with JWT authentication',
      'PostgreSQL database for content management',
      'Algorand blockchain for transparent settlements',
      'Automated reward calculation engine',
    ],
    tech: ['React', 'FastAPI', 'Algorand', 'PostgreSQL', 'IPFS', 'Web3.js'],
    thumbnail: '/images/projects/web3-youtube.jpg',
    liveLink: 'https://ffrg-srgvs.vercel.app/',
    demoVideo:
      'https://drive.google.com/file/d/1TdVUMZLf1hvi3W9visg2TvAAG5imYPS5/view?usp=drivesdk',
    challenges: [
      'Implementing secure wallet integration',
      'Optimizing IPFS for video streaming',
      'Managing blockchain transaction costs',
    ],
    solutions: [
      'Separated wallet authorization from application sessions to keep user identity portable.',
      'Used metadata-first content flows so heavy media can remain distributed without slowing browsing.',
      'Designed settlement logic around clear reward events and predictable transaction boundaries.',
    ],
    learnings: [
      'Blockchain architecture and smart contracts',
      'Decentralized authentication flows',
      'IPFS for distributed storage',
    ],
    metrics: [
      { label: 'Core Modules', value: '6', tone: 'cyan' },
      { label: 'Reward Flows', value: 'Auto', tone: 'emerald' },
      { label: 'Storage Model', value: 'IPFS', tone: 'purple' },
    ],
    milestones: [
      { label: 'Research', detail: 'Mapped creator, viewer, and advertiser incentives.' },
      { label: 'Prototype', detail: 'Built wallet-gated upload and browsing flows.' },
      { label: 'Settlement', detail: 'Connected engagement events to transparent rewards.' },
    ],
    architecture: ['React Client', 'FastAPI Gateway', 'PostgreSQL', 'IPFS', 'Algorand'],
    codeSnippet: `const rewardEvent = {
  creatorId,
  campaignId,
  engagementScore,
  settlementNetwork: 'Algorand',
};`,
    accent: 'cyan',
  },
  {
    id: 2,
    title: 'Smart Library Seat Visibility System',
    shortDescription:
      'Real-time library seat visibility solution for peak campus usage.',
    fullDescription:
      'Hybrid library management prototype solving seat visibility and overcrowding issues during peak hours using token-based mechanisms and real-time dashboards.',
    features: [
      'Real-time seat availability dashboard',
      'Token-based entry and exit mechanism',
      'QR code scanning for seat tracking',
      'Multi-floor library management',
      'Analytics and usage patterns',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Firebase', 'Tailwind CSS'],
    thumbnail: '/images/projects/smart-library.jpg',
    liveLink: 'https://smart-library-management-system-three.vercel.app/',
    demoVideo: '',
    challenges: [
      'Real-time synchronization across multiple users',
      'Accurate seat state management',
      'Mobile responsiveness for on-campus usage',
    ],
    solutions: [
      'Modeled seats as stateful records updated through token-based check-ins.',
      'Kept dashboard interactions touch-first for quick scanning in a campus environment.',
      'Separated administrative and student visibility states to reduce accidental updates.',
    ],
    learnings: [
      'Real-time database design with Firebase',
      'QR code integration',
      'Campus technology solutions',
    ],
    metrics: [
      { label: 'Seat States', value: 'Live', tone: 'emerald' },
      { label: 'Flow Type', value: 'Token', tone: 'cyan' },
      { label: 'Use Case', value: 'Campus', tone: 'amber' },
    ],
    milestones: [
      { label: 'Problem Framing', detail: 'Studied overcrowding and seat discovery pain points.' },
      { label: 'Realtime Model', detail: 'Designed seat state transitions and dashboard views.' },
      { label: 'Prototype', detail: 'Shipped student-facing availability screens.' },
    ],
    architecture: ['React Dashboard', 'Express API', 'Firebase Realtime DB', 'QR Scan Flow'],
    codeSnippet: `const nextSeatState =
  token.status === 'checked-in' ? 'occupied' : 'available';`,
    accent: 'emerald',
  },
  {
    id: 3,
    title: 'Event Vibe',
    shortDescription:
      'Group-based event discovery and planning platform.',
    fullDescription:
      'Web platform helping groups discover events using interests, location, date, and group-size based recommendations. Built with modern web technologies for a seamless event planning experience.',
    features: [
      'Interest-based event discovery',
      'Location filtering',
      'Group-size based recommendations',
      'Event planning and collaboration tools',
      'Social event sharing',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    thumbnail: '/images/projects/event-vibe.jpg',
    liveLink: '',
    demoVideo: '',
    images: [
      'https://media.licdn.com/dms/image/v2/D562DAQHmJIjs-KyBeQ/profile-treasury-image-shrink_480_480/B56Z3jatbrIkAU-/0/1777636923381?e=1779098400&v=beta&t=x3Pp2ePCWYmrv2n0ld_RfFCVfYkKrr07JvnoTEzkawc',
      'https://media.licdn.com/dms/image/v2/D562DAQEc_h1zYESvfA/profile-treasury-image-shrink_800_800/B56Z3jcTuQIYAI-/0/1777637342348?e=1779098400&v=beta&t=yKQuYKyBouq8kDlD286OzvB5XyPr4MmcX73vQf8yFZ0',
      'https://media.licdn.com/dms/image/v2/D562DAQEKtGLH-ntYRg/profile-treasury-image-shrink_480_480/B56Z3jbN61GUAU-/0/1777637056526?e=1779098400&v=beta&t=-303kZkz_ZcI-GaxubmmRDpOFDD3zlxuo9xu6lqyT3A',
    ],
    challenges: [
      'Implementing intelligent recommendation logic',
      'Handling real-time event updates',
      'Designing group decision workflows',
    ],
    solutions: [
      'Weighted event suggestions by group size, interest overlap, date, and location.',
      'Used Firebase to keep event availability and planning context current.',
      'Designed compact cards and filters for fast comparison between event options.',
    ],
    learnings: [
      'Social platform design patterns',
      'Recommendation systems',
      'Event management workflows',
    ],
    metrics: [
      { label: 'Filters', value: '4', tone: 'cyan' },
      { label: 'Planning', value: 'Group', tone: 'purple' },
      { label: 'Data', value: 'Realtime', tone: 'emerald' },
    ],
    milestones: [
      { label: 'Discovery', detail: 'Defined event matching dimensions and user context.' },
      { label: 'Interface', detail: 'Built comparison-first browsing and planning views.' },
      { label: 'Iteration', detail: 'Refined group recommendation rules from test cases.' },
    ],
    architecture: ['Static Frontend', 'Firebase Data Layer', 'Recommendation Rules', 'Group Planner'],
    codeSnippet: `const score = interests * 0.45 + location * 0.25 + date * 0.2 + groupFit * 0.1;`,
    accent: 'purple',
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    company: 'Cognifyz Technologies',
    position: 'Web Development Intern',
    duration: 'Mar 2026 - Present',
    description: 'Building and optimizing web applications.',
    type: 'internship',
    offerLetterImage:
      'https://media.licdn.com/dms/image/v2/D562DAQEEj507UXsy8Q/profile-treasury-image-shrink_800_800/B56Z0T9BeBJgAY-/0/1774156281506?e=1779098400&v=beta&t=2cuh8B-oceB0Nmhct-dMOZDgtq8loZ_UfHx1AbEnLY0',
    skills: ['Frontend Systems', 'Responsive UI', 'Performance', 'Team Delivery'],
    achievements: ['Built reusable UI screens', 'Improved responsive behavior', 'Practiced production workflows'],
    metrics: [
      { label: 'Role', value: 'Intern' },
      { label: 'Focus', value: 'Web' },
      { label: 'Mode', value: 'Remote' },
    ],
  },
  {
    id: 2,
    company: 'Backwaters Summit - IIM Kozhikode',
    position: 'Campus Ambassador',
    duration: '2025 - 2026',
    description: 'Driving outreach and student engagement initiatives.',
    type: 'leadership',
    certificateLink:
      'https://app.truscholar.io/profile?credId=699aa46007cac02f3915d9f1',
    skills: ['Outreach', 'Student Engagement', 'Leadership', 'Communication'],
    achievements: ['Coordinated campus awareness', 'Supported student participation', 'Practiced stakeholder communication'],
    metrics: [
      { label: 'Track', value: 'Leadership' },
      { label: 'Scope', value: 'Campus' },
      { label: 'Skills', value: '4' },
    ],
  },
];

export const HACKATHONS = [
  {
    id: 1,
    title: "TRAE | Vision X Build With TRAE Hackathon'26",
    date: '2026',
    status: 'Participant',
    rankTone: 'cyan',
    certificateLink:
      'https://drive.google.com/file/d/19SsXlGRTbHYgdXHHZIP5inpEN8aZS36x/view?usp=drivesdk',
    highlights: ['Rapid prototyping', 'AI-assisted build flow', 'Product pitch practice'],
  },
  {
    id: 2,
    title: 'CySecK Grand BootCamp and CTF',
    date: '2026',
    status: 'Participant',
    rankTone: 'emerald',
    certificateLink:
      'https://drive.google.com/file/d/1EnmF191NsROGYVX85acLN1976FkKt1V-/view?usp=drivesdk',
    highlights: ['Security fundamentals', 'CTF reasoning', 'Threat awareness'],
  },
  {
    id: 3,
    title: "RIFT '26 Hackathon",
    date: '2026',
    status: 'Semi Finalist',
    rankTone: 'purple',
    certificateLink:
      'https://rift2026.vercel.app/verify/348a57de-115d-4b6a-88d5-a4960f0d4eea',
    highlights: ['Semi-finalist milestone', 'Prototype validation', 'Team presentation'],
  },
] as const;

export const RESEARCH_TOPICS = [
  {
    id: 'decentralized-systems',
    label: 'Decentralized Systems',
    area: 'Blockchain',
    description:
      'Exploring how distributed storage, wallet identity, and transparent settlement can support creator and campus applications.',
    x: 17,
    y: 34,
    links: ['Blockchain Infrastructure', 'Scalable Web Platforms'],
  },
  {
    id: 'scalable-web',
    label: 'Scalable Web Platforms',
    area: 'Systems',
    description:
      'Studying API boundaries, realtime data flows, caching, and product architectures that stay understandable as usage grows.',
    x: 43,
    y: 22,
    links: ['Decentralized Systems', 'Startup Technology Ecosystems'],
  },
  {
    id: 'human-product',
    label: 'Human-Centered Product Design',
    area: 'Design',
    description:
      'Using UX research and design thinking to translate complex technical systems into clean, usable product experiences.',
    x: 72,
    y: 35,
    links: ['UI/UX Research', 'Startup Technology Ecosystems'],
  },
  {
    id: 'startup-tech',
    label: 'Startup Technology Ecosystems',
    area: 'Venture',
    description:
      'Connecting entrepreneurship, sustainable mobility, and early-stage product experiments into practical launch paths.',
    x: 56,
    y: 66,
    links: ['Human-Centered Product Design', 'Scalable Web Platforms'],
  },
  {
    id: 'blockchain-infra',
    label: 'Blockchain Infrastructure',
    area: 'Blockchain',
    description:
      'Investigating wallet UX, transaction costs, consensus tradeoffs, and storage strategies for real-world Web3 products.',
    x: 26,
    y: 74,
    links: ['Decentralized Systems'],
  },
  {
    id: 'ux-research',
    label: 'UI/UX Research',
    area: 'Design',
    description:
      'Learning how prototypes, usability tests, and design systems can reduce friction in student and creator workflows.',
    x: 84,
    y: 70,
    links: ['Human-Centered Product Design'],
  },
] as const;

export const RESEARCH_INTERESTS = RESEARCH_TOPICS.map((topic) => topic.label);

export type TechCategory =
  | 'Frontend'
  | 'Language'
  | 'Backend'
  | 'Database'
  | 'Blockchain'
  | 'Design'
  | 'Tools';

export type TechItem = {
  name: string;
  category: TechCategory;
  description: string;
  proficiency: number;
  related: string[];
  experience: string;
};

export const TECH_STACK: TechItem[] = [
  {
    name: 'React',
    category: 'Frontend',
    description: 'Modern UI library for interactive interfaces.',
    proficiency: 90,
    related: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    experience: 'Project interfaces, dashboards, and modal workflows.',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    description: 'Full-stack React framework for fast web applications.',
    proficiency: 85,
    related: ['React', 'TypeScript', 'Node.js'],
    experience: 'Portfolio architecture and production-oriented routing.',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Type-safe JavaScript for maintainable product code.',
    proficiency: 88,
    related: ['React', 'Next.js', 'Node.js'],
    experience: 'Strict component contracts and safer reusable utilities.',
  },
  {
    name: 'Firebase',
    category: 'Backend',
    description: 'Realtime database and backend services.',
    proficiency: 85,
    related: ['React', 'JavaScript', 'Node.js'],
    experience: 'Realtime dashboards and event discovery data flows.',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    description: 'Modern Python web framework for API services.',
    proficiency: 80,
    related: ['PostgreSQL', 'Python', 'Algorand'],
    experience: 'Backend gateway for decentralized video platform logic.',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Relational database management for structured product data.',
    proficiency: 82,
    related: ['FastAPI', 'Node.js'],
    experience: 'Content metadata and relational storage design.',
  },
  {
    name: 'Algorand',
    category: 'Blockchain',
    description: 'Blockchain platform for efficient Web3 applications.',
    proficiency: 75,
    related: ['Web3.js', 'FastAPI', 'IPFS'],
    experience: 'Transparent settlement and reward distribution research.',
  },
  {
    name: 'Web3.js',
    category: 'Blockchain',
    description: 'Blockchain interaction library for wallet-connected apps.',
    proficiency: 78,
    related: ['Algorand', 'React'],
    experience: 'Wallet-aware frontend experiments and transaction flows.',
  },
  {
    name: 'Figma',
    category: 'Design',
    description: 'UI/UX design tool for product thinking and prototyping.',
    proficiency: 85,
    related: ['React', 'Tailwind CSS'],
    experience: 'Wireframes, interaction sketches, and visual systems.',
  },
  {
    name: 'Git',
    category: 'Tools',
    description: 'Version control for collaborative software delivery.',
    proficiency: 90,
    related: ['GitHub', 'Next.js'],
    experience: 'Branching, commits, and project iteration workflows.',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Utility-first CSS framework for fast design systems.',
    proficiency: 92,
    related: ['React', 'Next.js', 'Figma'],
    experience: 'Responsive interfaces, glass panels, and motion states.',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'JavaScript runtime for APIs and tooling.',
    proficiency: 88,
    related: ['Express.js', 'Firebase', 'TypeScript'],
    experience: 'API prototypes and campus product backend flows.',
  },
];

