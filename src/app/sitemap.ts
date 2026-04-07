import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://guelma.guide'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/explore`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/map`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/concierge`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/payment`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/activate`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
