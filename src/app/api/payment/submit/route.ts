import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const email = formData.get('email') as string
    const transactionRef = formData.get('transactionRef') as string
    const plan = formData.get('plan') as string

    if (!email || !transactionRef || !plan) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && serviceKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, serviceKey)
      const { error } = await supabase.from('payments').insert({ email, transaction_ref: transactionRef, plan, status: 'pending' })
      if (error) {
        console.error('Supabase error:', error.message)
      }
    }

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'GuelmaGuide AI <noreply@guelma.guide>',
        to: email,
        subject: 'Payment Received — GuelmaGuide AI',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#0A0A0F;color:#fff;padding:32px;border-radius:16px">
            <h2 style="color:#D4AF37">Payment Received!</h2>
            <p>Hi there,</p>
            <p>We've received your CCP payment for the <strong>${plan}</strong> plan (Ref: ${transactionRef}).</p>
            <p>Our team will review your receipt and send your license key within <strong>24 hours</strong>.</p>
            <p style="color:#888">— GuelmaGuide AI Team</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true, message: 'Payment received, pending review.' })
  } catch (err) {
    console.error('Payment submit error:', err)
    return NextResponse.json({ success: false, error: 'Server error. Please try again.' }, { status: 500 })
  }
}
