'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Download, Clock, ChevronDown, ExternalLink, Key, Settings, Search, Zap, HelpCircle, MessageSquare, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const SECTIONS = [
  { id: 'api-key', label: 'Get Your API Key', icon: Key },
  { id: 'setup', label: 'Set Up Wolf Tool', icon: Settings },
  { id: 'leads', label: 'Find Leads', icon: Search },
  { id: 'agents', label: 'Deploy AI Agents', icon: Zap },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle },
];

const API_KEY_STEPS = [
  {
    step: 1,
    title: 'Sign in to Google Cloud Console',
    desc: (
      <>
        Go to{' '}
        <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light inline-flex items-center gap-1">
          Google Cloud Console <ExternalLink className="w-3 h-3" />
        </a>{' '}
        and sign in with your Google account.
      </>
    ),
    tip: 'Use the same Google account you use for Google Workspace if your company has one.',
  },
  {
    step: 2,
    title: 'Create a new project',
    desc: 'Click "Select a project" at the top, then "New Project". Name it "Wolf Tool" and click Create.',
    tip: null,
  },
  {
    step: 3,
    title: 'Open the API Library',
    desc: 'Open the navigation menu (hamburger icon top-left) and go to APIs & Services > Library.',
    tip: null,
  },
  {
    step: 4,
    title: 'Enable Places API',
    desc: 'Search for "Places API (New)" — click it and hit Enable.',
    tip: 'Make sure you enable "Places API (New)", not the legacy "Places API".',
  },
  {
    step: 5,
    title: 'Go to Credentials',
    desc: 'Go to APIs & Services > Credentials from the sidebar.',
    tip: null,
  },
  {
    step: 6,
    title: 'Create an API key',
    desc: 'Click "+ Create Credentials" at the top, then select "API key".',
    tip: 'For added security, click "Restrict Key" and limit it to the Places API only.',
  },
  {
    step: 7,
    title: 'Copy your key',
    desc: 'Your API key appears — click the copy icon to copy it.',
    tip: null,
  },
];

const SETUP_STEPS = [
  { step: 1, title: 'Open the app', desc: 'Open the Wolf Tool desktop app.', tip: null },
  { step: 2, title: 'Go to Settings', desc: 'Click Settings (gear icon) in the left sidebar.', tip: null },
  { step: 3, title: 'Paste your API key', desc: 'Paste your API key into the "Google Places API Key" field.', tip: null },
  { step: 4, title: 'Save your settings', desc: 'Click Save.', tip: null },
  { step: 5, title: 'Test the connection', desc: 'Click Test Connection — a green checkmark confirms it\'s working.', tip: 'If the test fails, double-check that billing is enabled on your Google Cloud project.' },
];

const LEADS_STEPS = [
  { step: 1, title: 'Open Lead Discovery', desc: 'Click Lead Discovery in the sidebar.', tip: null },
  { step: 2, title: 'Search for leads', desc: 'Enter a search like "marketing agencies in New York" or "restaurants in London".', tip: 'Be specific with your search — include industry + location for best results.' },
  { step: 3, title: 'Save your leads', desc: 'Results load from Google Places — click Save on any lead to add it to your pipeline.', tip: null },
];

const AGENT_STEPS = [
  { step: 1, title: 'Upgrade to Premium', desc: 'AI agents are available on the Premium plan. Go to Settings > Subscription to upgrade.', tip: null },
  { step: 2, title: 'Choose an agent', desc: 'Go to the Agents tab and select Jordan (prospecting), Donnie (follow-ups), or Naomi (strategy).', tip: 'Start with Jordan — he finds and qualifies prospects on LinkedIn automatically.' },
  { step: 3, title: 'Configure your target', desc: 'Tell the agent your ideal customer profile, industry, and any specific criteria.', tip: null },
  { step: 4, title: 'Review & approve', desc: 'AI agents draft messages for your review. Nothing gets sent without your approval.', tip: 'You can edit any message before approving — the AI learns from your changes over time.' },
];

const TROUBLESHOOTING = [
  {
    q: 'API key test fails with "invalid key"',
    a: 'Make sure you copied the full key without extra spaces. Go back to Google Cloud Console > Credentials and re-copy it.',
  },
  {
    q: 'API key test fails with "billing not enabled"',
    a: 'You need to enable billing on your Google Cloud project. Go to Billing in the sidebar and add a payment method. Google gives $200/month in free credits — you won\'t be charged.',
  },
  {
    q: '"Places API not enabled" error',
    a: 'Go to APIs & Services > Library, search for "Places API (New)", and click Enable. Make sure it\'s the NEW version.',
  },
  {
    q: 'No results when searching for leads',
    a: 'Try a more specific search with an industry and location, e.g. "dentists in Chicago". Some searches may not return results if the area has few listed businesses.',
  },
  {
    q: 'AI agents not responding',
    a: 'Check that you have an active Premium subscription. Go to Settings > Subscription to verify. If the issue persists, reach out on Discord.',
  },
  {
    q: 'App won\'t launch after update',
    a: 'Try uninstalling and reinstalling from the download page. Your data is stored in the cloud and will sync back automatically.',
  },
];

function StepList({ steps }: { steps: { step: number; title: string; desc: React.ReactNode; tip: string | null }[] }) {
  return (
    <div className="space-y-1">
      {steps.map((item, i) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="group"
        >
          <div className="flex gap-4 p-4 rounded-xl hover:bg-navy-800/30 transition-colors">
            {/* Step number + line */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/15 group-hover:border-gold/25 transition-all">
                <span className="text-sm font-bold text-gold">{item.step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-navy-700/30 mt-2" />
              )}
            </div>
            <div className="pb-4 flex-1">
              <p className="text-white font-semibold text-[15px] mb-1">{item.title}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              {item.tip && (
                <div className="mt-3 flex gap-2 bg-gold/[0.04] border border-gold/10 rounded-lg px-3 py-2.5">
                  <Info className="w-4 h-4 text-gold/60 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">{item.tip}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-700/20 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 px-1 text-left group"
      >
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-400 leading-relaxed pb-4 px-1">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GuidePage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-gold/70 text-sm font-semibold tracking-widest uppercase mb-4">Setup Guide</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5">
            <span className="text-white">Get Started with </span>
            <span className="gold-gradient">Wolf Tool</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Set up your Google API key, configure the app, and start finding leads — all in under 5 minutes.
          </p>
        </motion.div>

        {/* Time estimate */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/50 border border-navy-700/30 text-sm text-gray-400">
            <Clock className="w-4 h-4 text-gold/60" />
            Estimated time: <span className="text-white font-medium">5 minutes</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">

          {/* Sidebar nav */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">On this page</p>
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-navy-800/40 transition-all duration-200"
                >
                  <section.icon className="w-4 h-4 text-gold/50" />
                  {section.label}
                </a>
              ))}
            </div>
          </motion.aside>

          {/* Main content */}
          <div className="space-y-8">

            {/* Info banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-5 border-gold/15 bg-gold/[0.04]"
            >
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    You need a Google Cloud account (free) with billing enabled. Google gives{' '}
                    <span className="text-white font-semibold">$200/month in free credit</span>{' '}
                    — more than enough for Wolf Tool usage. You will not be charged.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 1 — Get Your Google API Key */}
            <motion.section
              id="api-key"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="card p-6 sm:p-8 border-navy-700/20 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center">
                  <Key className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Get Your Google API Key</h2>
                  <p className="text-xs text-gray-500">7 steps</p>
                </div>
              </div>
              <StepList steps={API_KEY_STEPS} />
            </motion.section>

            {/* Section 2 — Set Up Wolf Tool */}
            <motion.section
              id="setup"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="card p-6 sm:p-8 border-navy-700/20 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Set Up Wolf Tool</h2>
                  <p className="text-xs text-gray-500">5 steps</p>
                </div>
              </div>
              <StepList steps={SETUP_STEPS} />
            </motion.section>

            {/* Section 3 — Start Finding Leads */}
            <motion.section
              id="leads"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="card p-6 sm:p-8 border-navy-700/20 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center">
                  <Search className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Start Finding Leads</h2>
                  <p className="text-xs text-gray-500">3 steps</p>
                </div>
              </div>
              <StepList steps={LEADS_STEPS} />
            </motion.section>

            {/* Section 4 — Deploy AI Agents */}
            <motion.section
              id="agents"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="card p-6 sm:p-8 border-navy-700/20 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Deploy AI Agents</h2>
                  <p className="text-xs text-gray-500">4 steps &middot; Premium</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Premium</span>
              </div>
              <StepList steps={AGENT_STEPS} />
            </motion.section>

            {/* Section 5 — Troubleshooting */}
            <motion.section
              id="troubleshooting"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="card p-6 sm:p-8 border-navy-700/20 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Troubleshooting</h2>
                  <p className="text-xs text-gray-500">Common issues</p>
                </div>
              </div>
              <div>
                {TROUBLESHOOTING.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.section>

            {/* Help banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-6 border-navy-700/20 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Still stuck?</p>
                <p className="text-gray-400 text-sm">Join our Discord for real-time help from the community and team.</p>
              </div>
              <a
                href="https://discord.gg/bFYDEgUBfe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm px-5 py-2 shrink-0"
              >
                Join Discord
              </a>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <p className="text-gray-300 font-medium">You&apos;re all set!</p>
              </div>
              <p className="text-gray-500 text-sm mb-6">Download Wolf Tool and start closing deals today.</p>
              <Link href="/download" className="btn-gold text-lg px-10 py-4 inline-flex items-center gap-2.5 group">
                <Download className="w-5 h-5" />
                Download Wolf Tool
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
