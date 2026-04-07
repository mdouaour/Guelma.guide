import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'GuelmaGuide AI | Discover Guelma, Algeria',
  description: 'Your AI-powered guide to Guelma, Algeria. Explore ancient Roman ruins, natural hot springs, and rich cultural heritage with our intelligent travel companion.',
  keywords: ['Guelma', 'Algeria', 'tourism', 'travel guide', 'Roman ruins', 'Hammam Debagh', 'AI guide'],
  openGraph: {
    title: 'GuelmaGuide AI | Discover Guelma, Algeria',
    description: 'Your AI-powered guide to Guelma, Algeria.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://guelma.guide',
    siteName: 'GuelmaGuide AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GuelmaGuide AI | Discover Guelma, Algeria',
    description: 'Your AI-powered guide to Guelma, Algeria.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
