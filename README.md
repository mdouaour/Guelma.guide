# Guelma.guide

AI-powered city guide for Guelma, Algeria — interactive map, AI concierge, and license-key access system.

---

## ⚡ One-click deploy (works from a phone)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmdouaour%2FGuelma.guide&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,RESEND_API_KEY,ADMIN_SECRET,NEXT_PUBLIC_APP_URL&envDescription=See%20.env.example%20for%20where%20to%20find%20each%20value&envLink=https%3A%2F%2Fgithub.com%2Fmdouaour%2FGuelma.guide%2Fblob%2Fmain%2F.env.example&project-name=guelma-guide&repository-name=Guelma.guide)

Tap the button → sign in to Vercel → fill in the 6 env vars (see table below) → **Deploy**.  
No terminal required.

---

## 🗺️ Maps

Maps are powered by **OpenStreetMap** via **Leaflet** — 100% free, no API key required.

---

## 🔑 Required environment variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | [Supabase](https://supabase.com) → your project → Settings → API → **Project URL** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page → **anon / public** key |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page → **service_role** key (keep secret) |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys) → Create API Key |
| `ADMIN_SECRET` | Any strong random string you invent |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL, e.g. `https://guelma.guide` |

---

## 🗄️ Supabase database setup

After creating your Supabase project, run the schema once in the **SQL Editor**  
(Supabase dashboard → SQL Editor → New query → paste → Run):

```sql
-- found in src/lib/schema.sql
```

Or open [`src/lib/schema.sql`](src/lib/schema.sql) and copy-paste the full contents.

---

## 🛠️ Local development

```bash
cp .env.example .env.local   # fill in real values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
