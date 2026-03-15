import Link from 'next/link';
import WolfLogo from '@/components/icons/WolfLogo';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Download', href: '/download' },
    { label: 'Setup Guide', href: '/guide' },
  ],
  Compare: [
    { label: 'vs Apollo.io', href: '/vs/apollo' },
    { label: 'vs Lemlist', href: '/vs/lemlist' },
    { label: 'vs Instantly.ai', href: '/vs/instantly' },
    { label: 'vs Sales Navigator', href: '/vs/linkedin-sales-navigator' },
  ],
  Company: [
    { label: 'Community', href: '/community' },
    { label: 'Discord', href: 'https://discord.gg/bFYDEgUBfe' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-navy-700/20">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <WolfLogo size={26} className="text-gold" />
              <span className="text-lg font-bold gold-gradient">Wolf Tool</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              AI-powered sales prospecting tool that gamifies your pipeline.
              Unleash your inner wolf.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-5">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-navy-700/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Wolf Tool. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Built for closers, by closers.
          </p>
        </div>
      </div>
    </footer>
  );
}
