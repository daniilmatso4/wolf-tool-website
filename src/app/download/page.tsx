'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Apple, Shield, Loader2 } from 'lucide-react';

type Platform = 'windows' | 'mac';

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'windows';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'mac';
  return 'windows';
}

const platformInfo = {
  windows: {
    label: 'Windows',
    icon: Monitor,
    file: 'Wolf Tool Setup 1.0.0.exe',
    requirements: 'Windows 10/11',
    size: '~85 MB',
    steps: [
      { step: 1, title: 'Download the installer', desc: 'Click the download button to get Wolf Tool Setup 1.0.0.exe' },
      { step: 2, title: 'Run the installer', desc: 'Double-click the downloaded file. If Windows SmartScreen appears, click "More info" then "Run anyway".' },
      { step: 3, title: 'Sign in', desc: 'Open Wolf Tool and sign in with the same email you used on this website.' },
      { step: 4, title: 'Start prospecting', desc: 'Connect your LinkedIn account, set your target, and deploy your AI agents!' },
    ],
  },
  mac: {
    label: 'macOS',
    icon: Apple,
    file: 'Wolf Tool-1.0.0.dmg',
    requirements: 'macOS 11+',
    size: '~90 MB',
    steps: [
      { step: 1, title: 'Download the DMG', desc: 'Click the download button to get Wolf Tool-1.0.0.dmg' },
      { step: 2, title: 'Install the app', desc: 'Open the DMG and drag Wolf Tool into your Applications folder.' },
      { step: 3, title: 'Sign in', desc: 'Open Wolf Tool and sign in with the same email you used on this website.' },
      { step: 4, title: 'Start prospecting', desc: 'Connect your LinkedIn account, set your target, and deploy your AI agents!' },
    ],
  },
};

export default function DownloadPage() {
  const [platform, setPlatform] = useState<Platform>('windows');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const info = platformInfo[platform];
  const otherPlatform = platform === 'windows' ? 'mac' : 'windows';
  const Icon = info.icon;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/download?platform=${platform}`);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Download error:', err);
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Download </span>
            <span className="gold-gradient">Wolf Tool</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Get the desktop app for free and start closing deals today.
          </p>
        </motion.div>

        {/* Platform toggle */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setPlatform('windows')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              platform === 'windows'
                ? 'bg-gold/20 text-gold border border-gold/30'
                : 'bg-navy-800/50 text-gray-400 border border-navy-700 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            Windows
          </button>
          <button
            onClick={() => setPlatform('mac')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              platform === 'mac'
                ? 'bg-gold/20 text-gold border border-gold/30'
                : 'bg-navy-800/50 text-gray-400 border border-navy-700 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            macOS
          </button>
        </div>

        {/* Download card */}
        <motion.div
          key={platform}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 border-gold/20 text-center mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Wolf Tool for {info.label}</h2>
          <p className="text-gray-400 text-sm mb-6">
            Version 1.0.0 &bull; {info.requirements} &bull; {info.size} &bull; Free
          </p>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-gold text-lg px-10 py-4 inline-flex items-center gap-2 disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {downloading ? 'Preparing Download...' : `Download for ${info.label}`}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            Virus-free &bull; Open source
          </div>

          <p className="text-xs text-gray-600 mt-3">
            Looking for{' '}
            <button onClick={() => setPlatform(otherPlatform)} className="text-gold hover:text-gold-light">
              {platformInfo[otherPlatform].label}
            </button>
            ?
          </p>
        </motion.div>

        {/* Installation guide */}
        <motion.div
          key={`guide-${platform}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-8 border-navy-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-6">Installation Guide</h3>
          <div className="space-y-4">
            {info.steps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-gold">{item.step}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
