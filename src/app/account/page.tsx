'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  CreditCard,
  Download,
  LogOut,
  Loader2,
  Settings,
  Crown,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface Subscription {
  id: string;
  status: string;
  price_id: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export default function AccountPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadAccount = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in?redirect=/account');
        return;
      }
      setUser(user);

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .single();

      setSubscription(sub);
      setLoading(false);
    };
    loadAccount();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Portal error:', err);
    }
    setPortalLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  const tierName = subscription
    ? 'Premium'
    : 'Free';

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile card */}
            <div className="card p-6 border-navy-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-white">Profile</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Name</label>
                  <p className="text-white font-medium">
                    {user?.user_metadata?.full_name || 'Wolf User'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Member Since</label>
                  <p className="text-white font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription card */}
            <div className="card p-6 border-gold/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-white">Subscription</h2>
              </div>

              {subscription ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gold">{tierName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      subscription.status === 'active' ? 'bg-green-500/10 text-green-400' :
                      subscription.status === 'trialing' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {subscription.status === 'trialing' ? 'Trial' : subscription.status}
                    </span>
                  </div>

                  {subscription.current_period_end && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        {subscription.cancel_at_period_end ? 'Expires' : 'Renews'}
                      </label>
                      <p className="text-white font-medium">
                        {new Date(subscription.current_period_end).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="btn-outline w-full py-2.5 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {portalLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Manage Subscription
                        <ExternalLink className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400 text-sm mb-4">No active subscription</p>
                  <button
                    onClick={() => router.push('/pricing')}
                    className="btn-gold py-2.5 px-6 text-sm"
                  >
                    View Plans
                  </button>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="card p-6 border-navy-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/download')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-navy-900 border border-navy-700/50 hover:border-gold/20 transition-colors text-left"
                >
                  <Download className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-white">Download Wolf Tool</p>
                    <p className="text-xs text-gray-500">Get the latest desktop app</p>
                  </div>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-navy-900 border border-navy-700/50 hover:border-red-500/20 transition-colors text-left"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Sign Out</p>
                    <p className="text-xs text-gray-500">Log out of your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
