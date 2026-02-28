import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const { data: { users }, error: userError } = await getSupabaseAdmin().auth.admin.listUsers();
    if (userError) {
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json({
        valid: false,
        error: 'No account found',
      });
    }

    // Owner always gets premium
    if (user.app_metadata?.role === 'owner') {
      return NextResponse.json({
        valid: true,
        tier: 'premium',
        status: 'active',
        role: 'owner',
      });
    }

    // Check for active subscription
    const { data: subscription } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('status, price_id, current_period_end, cancel_at_period_end')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .single();

    if (!subscription) {
      return NextResponse.json({
        valid: false,
        error: 'No active subscription',
      });
    }

    const tier = 'premium';

    return NextResponse.json({
      valid: true,
      tier,
      status: subscription.status,
      expiresAt: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  } catch (error: any) {
    console.error('License verify error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
