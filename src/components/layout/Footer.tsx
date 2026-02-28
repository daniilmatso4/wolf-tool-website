import Link from 'next/link';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Download', href: '/download' },
    { label: 'Changelog', href: '/community' },
  ],
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'Community', href: '/community' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  Support: [
    { label: 'Discord', href: 'https://discord.gg/bFYDEgUBfe' },
    { label: 'Email Support', href: 'mailto:support@wolfpack.ai' },
    { label: 'Documentation', href: '/docs' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🐺</span>
              <span className="text-xl font-bold gold-gradient">Wolf Tool</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered sales prospecting tool that gamifies your pipeline.
              Unleash your inner wolf.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-navy-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Wolf Tool. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built for closers, by closers.
          </p>
        </div>
      </div>
    </footer>
  );
}
