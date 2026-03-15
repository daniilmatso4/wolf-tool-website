// Agent definitions from the desktop app
export const AGENTS = [
  {
    id: 'jordan',
    name: 'Jordan Belfort',
    title: 'The Closer',
    avatar: 'WolfLogo',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
    borderColor: 'border-gold/30',
    description: 'Finds high-value prospects on LinkedIn and crafts irresistible opening messages that demand a response.',
  },
  {
    id: 'donnie',
    name: 'Donnie Azoff',
    title: 'The Hustler',
    avatar: 'Flame',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    description: 'Relentlessly works your pipeline, following up with prospects and keeping deals moving forward.',
  },
  {
    id: 'naomi',
    name: 'Naomi Lapaglia',
    title: 'The Strategist',
    avatar: 'Gem',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
    description: 'Analyzes your brand, crafts your positioning, and develops personalized outreach strategies.',
  },
] as const;

// Leveling system from the desktop app
export const LEVELS = [
  { level: 1, title: 'Intern', xp_required: 0 },
  { level: 2, title: 'Junior Broker', xp_required: 100 },
  { level: 3, title: 'Broker', xp_required: 300 },
  { level: 4, title: 'Senior Broker', xp_required: 750 },
  { level: 5, title: 'Associate VP', xp_required: 1500 },
  { level: 6, title: 'Vice President', xp_required: 3000 },
  { level: 7, title: 'Senior VP', xp_required: 5000 },
  { level: 8, title: 'Managing Director', xp_required: 8000 },
  { level: 9, title: 'Partner', xp_required: 12000 },
  { level: 10, title: 'Wolf of Wall Street', xp_required: 20000 },
] as const;

// Achievement definitions from the desktop app
export const ACHIEVEMENTS = [
  { id: 'first_call', name: 'First Dial', description: 'Make your first phone call', icon: 'PhoneCall', category: 'calls' },
  { id: 'calls_10', name: 'Phone Warrior', description: 'Make 10 phone calls', icon: 'Phone', category: 'calls' },
  { id: 'calls_50', name: 'Dialing Machine', description: 'Make 50 phone calls', icon: 'Flame', category: 'calls' },
  { id: 'calls_100', name: 'The Closer', description: 'Make 100 phone calls', icon: 'Trophy', category: 'calls' },
  { id: 'first_email', name: 'First Outreach', description: 'Send your first email', icon: 'Mail', category: 'emails' },
  { id: 'emails_25', name: 'Inbox Slayer', description: 'Send 25 emails', icon: 'Send', category: 'emails' },
  { id: 'emails_100', name: 'Email Mogul', description: 'Send 100 emails', icon: 'Inbox', category: 'emails' },
  { id: 'first_deal', name: 'First Blood', description: 'Close your first deal', icon: 'DollarSign', category: 'deals' },
  { id: 'deals_5', name: 'Deal Maker', description: 'Close 5 deals', icon: 'Banknote', category: 'deals' },
  { id: 'deals_25', name: 'Money Machine', description: 'Close 25 deals', icon: 'CircleDollarSign', category: 'deals' },
  { id: 'streak_3', name: 'On Fire', description: '3 day activity streak', icon: 'Flame', category: 'streak' },
  { id: 'streak_7', name: 'Week Warrior', description: '7 day activity streak', icon: 'Zap', category: 'streak' },
  { id: 'streak_30', name: 'Unstoppable', description: '30 day activity streak', icon: 'Dumbbell', category: 'streak' },
  { id: 'first_meeting', name: 'Face Time', description: 'Log your first meeting', icon: 'Handshake', category: 'meetings' },
  { id: 'meetings_10', name: 'Networking Pro', description: 'Log 10 meetings', icon: 'Globe', category: 'meetings' },
  { id: 'leads_10', name: 'Prospector', description: 'Save 10 leads', icon: 'Search', category: 'leads' },
  { id: 'leads_50', name: 'Lead Hunter', description: 'Save 50 leads', icon: 'Target', category: 'leads' },
] as const;

// Pricing tiers
export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Full access to Wolf Tool — no strings attached.',
    monthlyPrice: 0,
    annualPrice: 0,
    free: true,
    features: [
      { text: 'Sales pipeline management', included: true },
      { text: 'Lead tracking & discovery', included: true },
      { text: 'Gamification & achievements', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Discord community support', included: true },
      { text: 'AI Agents', included: false },
    ],
    popular: false,
    cta: 'Download Free',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlock the AI wolf pack to automate your outreach.',
    monthlyPrice: 50,
    annualPrice: 40,
    free: false,
    features: [
      { text: 'Everything in Free', included: true },
      { text: '3 AI Agents (Jordan, Donnie, Naomi)', included: true },
      { text: 'Unlimited AI-powered leads', included: true },
      { text: 'Smart outreach messages', included: true },
      { text: 'Brand analysis & strategy', included: true },
      { text: 'Email support', included: true },
    ],
    popular: true,
    cta: 'Start Free Trial',
  },
] as const;

// Navigation links
export const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Guide', href: '/guide' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Community', href: '/community' },
] as const;

// Pipeline stages for demo
export const PIPELINE_STAGES = [
  { name: 'New Lead', color: 'bg-blue-500', count: 24 },
  { name: 'Contacted', color: 'bg-yellow-500', count: 18 },
  { name: 'Interested', color: 'bg-orange-500', count: 12 },
  { name: 'Meeting Set', color: 'bg-purple-500', count: 7 },
  { name: 'Closed Won', color: 'bg-green-500', count: 5 },
] as const;

// Competitor comparison data
export type ComparisonFeature = {
  feature: string;
  wolf: string | boolean;
  competitor: string | boolean;
};

export type Competitor = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  wolfPrice: string;
  features: ComparisonFeature[];
  wolfAdvantages: string[];
  competitorWeaknesses: string[];
};

export const COMPETITORS: Record<string, Competitor> = {
  apollo: {
    slug: 'apollo',
    name: 'Apollo.io',
    tagline: 'Why sales teams are switching from Apollo.io to Wolf Tool',
    description: 'Apollo.io is a popular sales intelligence platform with a massive B2B database. But it lacks AI agents, gamification, and charges premium prices for features Wolf Tool includes free.',
    price: 'From $49/mo',
    wolfPrice: 'Free core / $50/mo Premium',
    features: [
      { feature: 'AI Sales Agents', wolf: true, competitor: false },
      { feature: 'LinkedIn Prospecting', wolf: true, competitor: true },
      { feature: 'Gamified Sales Pipeline', wolf: true, competitor: false },
      { feature: 'Free Core App', wolf: true, competitor: 'Limited free tier' },
      { feature: 'Human-in-the-Loop Approval', wolf: true, competitor: false },
      { feature: 'Achievement System & XP', wolf: true, competitor: false },
      { feature: 'Team Leaderboards', wolf: true, competitor: false },
      { feature: 'B2B Contact Database', wolf: 'Via LinkedIn', competitor: '275M+ contacts' },
      { feature: 'Email Sequences', wolf: 'AI-crafted', competitor: true },
      { feature: 'Desktop App', wolf: true, competitor: false },
      { feature: 'Brand Analysis AI', wolf: true, competitor: false },
      { feature: 'CRM Integrations', wolf: 'Coming soon', competitor: true },
    ],
    wolfAdvantages: [
      'AI agents that autonomously prospect and craft personalized messages',
      'Gamified experience that keeps your team motivated and accountable',
      'Free core app with full pipeline management — no paywall on essentials',
      'Human-in-the-loop: every outreach requires your approval before sending',
    ],
    competitorWeaknesses: [
      'No AI agents — requires manual prospecting and message writing',
      'Expensive plans with feature gating across tiers',
      'No gamification or engagement mechanics for sales teams',
      'Steep learning curve with complex interface',
    ],
  },
  lemlist: {
    slug: 'lemlist',
    name: 'Lemlist',
    tagline: 'Why closers choose Wolf Tool over Lemlist',
    description: 'Lemlist focuses on cold email outreach with personalization. While it excels at email campaigns, it lacks AI-powered prospecting agents, gamification, and the full pipeline management Wolf Tool offers for free.',
    price: 'From $39/mo',
    wolfPrice: 'Free core / $50/mo Premium',
    features: [
      { feature: 'AI Sales Agents', wolf: true, competitor: false },
      { feature: 'LinkedIn Prospecting', wolf: true, competitor: 'Add-on' },
      { feature: 'Gamified Sales Pipeline', wolf: true, competitor: false },
      { feature: 'Free Core App', wolf: true, competitor: false },
      { feature: 'Human-in-the-Loop Approval', wolf: true, competitor: false },
      { feature: 'Cold Email Sequences', wolf: 'AI-crafted', competitor: true },
      { feature: 'Email Warm-up', wolf: 'Not needed', competitor: true },
      { feature: 'Achievement System & XP', wolf: true, competitor: false },
      { feature: 'Multi-channel Outreach', wolf: 'LinkedIn + Email', competitor: 'Email + LinkedIn' },
      { feature: 'Desktop App', wolf: true, competitor: false },
      { feature: 'Brand Analysis AI', wolf: true, competitor: false },
      { feature: 'Image Personalization', wolf: false, competitor: true },
    ],
    wolfAdvantages: [
      'Three AI agents working simultaneously to fill your pipeline',
      'Free core app — Lemlist has no free tier at all',
      'Built-in gamification keeps your team engaged and competitive',
      'Desktop app with native performance — not just another browser tab',
    ],
    competitorWeaknesses: [
      'No free tier — starts at $39/month minimum',
      'Focused only on email — limited LinkedIn integration without add-ons',
      'No AI agents or autonomous prospecting capability',
      'No gamification or team engagement features',
    ],
  },
  instantly: {
    slug: 'instantly',
    name: 'Instantly.ai',
    tagline: 'Wolf Tool vs Instantly — the smarter way to prospect',
    description: 'Instantly.ai is built for high-volume cold email at scale. While it can send thousands of emails, it lacks intelligent AI agents, gamification, and the LinkedIn-first approach that Wolf Tool brings to modern sales.',
    price: 'From $30/mo',
    wolfPrice: 'Free core / $50/mo Premium',
    features: [
      { feature: 'AI Sales Agents', wolf: true, competitor: false },
      { feature: 'LinkedIn Prospecting', wolf: true, competitor: false },
      { feature: 'Gamified Sales Pipeline', wolf: true, competitor: false },
      { feature: 'Free Core App', wolf: true, competitor: false },
      { feature: 'Human-in-the-Loop Approval', wolf: true, competitor: false },
      { feature: 'Unlimited Email Accounts', wolf: false, competitor: true },
      { feature: 'Email Warm-up', wolf: 'Not needed', competitor: true },
      { feature: 'Achievement System & XP', wolf: true, competitor: false },
      { feature: 'B2B Lead Database', wolf: 'Via LinkedIn', competitor: '160M+ contacts' },
      { feature: 'Desktop App', wolf: true, competitor: false },
      { feature: 'Brand Analysis AI', wolf: true, competitor: false },
      { feature: 'High-volume Email', wolf: false, competitor: true },
    ],
    wolfAdvantages: [
      'AI agents that think, not just send — personalized outreach at every step',
      'LinkedIn-first prospecting finds decision-makers where they live',
      'Gamification transforms cold outreach from a grind into a game',
      'Free core app means you can start closing without spending a dime',
    ],
    competitorWeaknesses: [
      'Email-only — no LinkedIn prospecting or social selling',
      'No AI agents — you still write the messages yourself',
      'No gamification — just a dashboard with metrics',
      'No free tier — every feature is behind a paywall',
    ],
  },
  'linkedin-sales-navigator': {
    slug: 'linkedin-sales-navigator',
    name: 'LinkedIn Sales Navigator',
    tagline: 'Everything Sales Navigator does — plus AI agents, for less',
    description: 'LinkedIn Sales Navigator is the gold standard for LinkedIn prospecting. But at $99/month with no AI agents, no pipeline gamification, and no automated outreach, Wolf Tool delivers more value at a fraction of the cost.',
    price: 'From $99/mo',
    wolfPrice: 'Free core / $50/mo Premium',
    features: [
      { feature: 'AI Sales Agents', wolf: true, competitor: false },
      { feature: 'LinkedIn Prospecting', wolf: true, competitor: true },
      { feature: 'Gamified Sales Pipeline', wolf: true, competitor: false },
      { feature: 'Free Core App', wolf: true, competitor: false },
      { feature: 'Human-in-the-Loop Approval', wolf: true, competitor: false },
      { feature: 'Advanced LinkedIn Filters', wolf: 'Via AI agents', competitor: true },
      { feature: 'InMail Credits', wolf: false, competitor: '50/mo' },
      { feature: 'Achievement System & XP', wolf: true, competitor: false },
      { feature: 'CRM Sync', wolf: 'Coming soon', competitor: true },
      { feature: 'Desktop App', wolf: true, competitor: false },
      { feature: 'Automated Outreach', wolf: true, competitor: false },
      { feature: 'Brand Analysis AI', wolf: true, competitor: false },
    ],
    wolfAdvantages: [
      'AI agents automate what Sales Navigator makes you do manually',
      'Half the price of Sales Navigator with AI-powered automation included',
      'Gamification keeps your sales team motivated — Sales Nav is just a search tool',
      'Built-in pipeline management — no separate CRM needed',
    ],
    competitorWeaknesses: [
      'Extremely expensive at $99+/month per seat',
      'No automation — you still do all prospecting and messaging manually',
      'No pipeline management — requires a separate CRM',
      'No gamification or team engagement features',
    ],
  },
} as const;
