'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { NAV_LINKS } from '@/lib/constants';
import WolfLogo from '@/components/icons/WolfLogo';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-navy-950/90 backdrop-blur-xl border-b border-navy-700/30 shadow-lg shadow-navy-950/50'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <WolfLogo size={26} className="text-gold group-hover:drop-shadow-[0_0_8px_rgba(212,168,67,0.4)] transition-all duration-300" />
            <span className="text-lg font-bold gold-gradient">Wolf Tool</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/account"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                <User className="w-4 h-4" />
                Account
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/download"
                  className="btn-gold text-sm px-5 py-2"
                >
                  Download Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-navy-950/95 backdrop-blur-xl border-b border-navy-700/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 hover:text-white hover:bg-navy-800/30 transition-all text-sm font-medium py-2.5 px-3 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-navy-700/30 my-2" />
              {user ? (
                <Link
                  href="/account"
                  className="block text-gray-400 hover:text-white transition-colors text-sm font-medium py-2.5 px-3 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="block text-gray-400 hover:text-white transition-colors text-sm font-medium py-2.5 px-3 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/download"
                    className="block btn-gold text-sm text-center py-2.5 mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Download Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
