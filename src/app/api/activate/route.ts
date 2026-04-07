import { NextRequest, NextResponse } from 'next/server'

const planFeatures: Record<string, string[]> = {
  standard: ['100+ Landmark Guides', 'AI Concierge Access', 'Interactive Map', 'Offline Mode'],
  pro: ['Everything in Standard', 'Priority Support', 'Early Access Features', 'Commercial Use License'],
}

export async function POST(req: NextRequest) {
  try {
    const { licenseKey, email } = await req.json()

    if (!licenseKey) {
      return NextResponse.json({ success: false, error: 'License key is required.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && serviceKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, serviceKey)

      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .eq('key', licenseKey)
        .single()

      if (error || !data) {
        return NextResponse.json({ success: false, error: 'Invalid or expired license key.' }, { status: 404 })
      }

      if (data.is_used) {
        return NextResponse.json({ success: false, error: 'This license key has already been used.' }, { status: 409 })
      }

      await supabase
        .from('licenses')
        .update({ is_used: true, email: email || data.email, activated_at: new Date().toISOString() })
        .eq('key', licenseKey)

      return NextResponse.json({
        success: true,
        plan: data.plan,
        features: planFeatures[data.plan] || planFeatures.standard,
      })
    }

    // Fallback: Supabase not configured — demo mode
    return NextResponse.json({
      success: false,
      error: 'License validation service is not configured. Please contact support.',
    }, { status: 503 })
  } catch (err) {
    console.error('Activation error:', err)
    return NextResponse.json({ success: false, error: 'Server error. Please try again.' }, { status: 500 })
  }
}
