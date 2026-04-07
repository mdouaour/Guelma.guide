import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const adminSecret = req.headers.get('x-admin-secret')
  const expectedSecret = process.env.ADMIN_SECRET

  if (!expectedSecret || adminSecret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { plan = 'standard' } = await req.json()
    const key = randomUUID().toUpperCase()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && serviceKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, serviceKey)
      const { error } = await supabase.from('licenses').insert({ key, plan, is_used: false })
      if (error) {
        console.error('Supabase insert error:', error.message)
        return NextResponse.json({ error: 'Failed to store license key.' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, key, plan })
  } catch (err) {
    console.error('Generate key error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
