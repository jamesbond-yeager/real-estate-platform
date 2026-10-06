# Prestige Properties — Real Estate Lead Generation Platform

A production-ready, SEO-optimised real estate website built with **Next.js 14 App Router**, TypeScript, Tailwind CSS, and Framer Motion. Designed to generate and qualify inbound leads for a real estate agent.

---

## Table of Contents

1. [Running Locally](#running-locally)
2. [Folder Structure](#folder-structure)
3. [Editing Listings](#editing-listings)
4. [Connecting the Form Backend](#connecting-the-form-backend)
5. [Deploying to Vercel (Free)](#deploying-to-vercel-free)
6. [Deploying to Netlify (Backup)](#deploying-to-netlify-backup)
7. [Customising the Site](#customising-the-site)

---

## Running Locally

**Prerequisites:** Node.js 18+ and npm (or pnpm / yarn).

```bash
# 1. Clone or download the project
git clone <your-repo-url>
cd real-estate-platform

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Then edit .env.local with your values (see below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
real-estate-platform/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, navbar, footer)
│   ├── page.tsx                # Homepage
│   ├── listings/
│   │   ├── page.tsx            # All listings with filters
│   │   └── [id]/page.tsx       # Individual property detail page
│   ├── about/page.tsx          # Agent profile page
│   ├── contact/page.tsx        # Contact page
│   ├── api/contact/route.ts    # Form API proxy → Web3Forms
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── home/                   # Hero, SearchBar, FeaturedListings, etc.
│   ├── listings/               # ListingCard, ListingFilters, PropertyGallery
│   ├── forms/                  # ContactForm, EnquiryForm, CallbackWidget, NotifySignup
│   └── ui/                     # Button, Badge, ThemeToggle, WhatsAppButton, EMICalculator
├── data/
│   └── listings.json           # ← EDIT THIS to add/update properties
├── types/
│   └── listing.ts              # TypeScript type for a Listing
└── lib/
    └── utils.ts                # Helper functions
```

---

## Editing Listings

All property data lives in **`data/listings.json`**. It's a JSON array of listing objects.

### To add a new listing

Copy any existing entry in `listings.json` and change the values. Make sure to:

- Give it a **unique `id`** (use lowercase with hyphens, e.g. `"luxury-villa-jayanagar-2"`)
- Set `"status"` to `"available"`, `"sold"`, `"rented"`, or `"under_offer"`
- Set `"featured": true` to show it on the homepage
- Use **real Unsplash image URLs** — format: `https://images.unsplash.com/photo-PHOTOID?w=1200&q=85`

### Listing fields explained

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique URL slug. Must be unique. |
| `title` | string | Property headline |
| `type` | `"buy"` \| `"rent"` \| `"lease"` | Transaction type |
| `category` | string | `residential`, `apartment`, `villa`, `pg`, `land`, `resort`, `commercial`, `luxury` |
| `price` | number | Raw number in INR (e.g. `5500000` for ₹55 lakh) |
| `priceLabel` | string | Human-readable price (e.g. `"₹55 Lakh"` or `"₹45,000/mo"`) |
| `location` | string | Display address |
| `lat` / `lng` | number | GPS coordinates for the map |
| `bedrooms` | number | Use `0` for commercial/land |
| `bathrooms` | number | Use `0` for land |
| `area` | number | Numeric area |
| `areaUnit` | string | `"sq ft"`, `"sq m"`, `"acres"`, or `"cents"` |
| `images` | string[] | Array of image URLs. First is thumbnail. |
| `description` | string | Full property description |
| `status` | string | `available`, `sold`, `rented`, or `under_offer` |
| `featured` | boolean | `true` to show on the homepage carousel |
| `amenities` | string[] | List of amenities |
| `yearBuilt` | number \| null | Year built, or `null` for land |
| `parking` | number | Number of parking spots |
| `furnishing` | string (optional) | `"furnished"`, `"semi-furnished"`, `"unfurnished"` |
| `facing` | string (optional) | e.g. `"East"`, `"North-East"` |
| `floor` | string (optional) | e.g. `"3rd of 12"` |

---

## Connecting the Form Backend

The site uses **Web3Forms** — a free, no-server email forwarding service. No backend needed.

### Setup steps (takes 2 minutes)

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email address and click **Create Access Key**
3. Check your email for your key
4. Open `.env.local` and set:
   ```
   WEB3FORMS_ACCESS_KEY=your_actual_key_here
   ```

**That's it.** All form submissions (contact form, enquiry forms, callback requests, notify signups) will arrive in your inbox.

> **Without the key set**: In development, submissions are printed to the terminal console — nothing is sent. The form will still show a success message to the user.

### What forms are wired up

| Form | Where | What it captures |
|------|-------|-----------------|
| Main Contact Form | `/contact` | Full lead with budget, timeline, financing preference |
| Enquiry Form | `/listings/[id]` | Property-specific enquiry |
| Callback Widget | Floating (all pages) | Quick callback request |
| Notify Signup | Homepage | Email + property interest for new listings |

---

## Deploying to Vercel (Free)

Vercel is Next.js's native host and offers a generous free tier.

### Step-by-step

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repo on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/real-estate-platform.git
   git push -u origin main
   ```

2. **Sign up / log in at [vercel.com](https://vercel.com)** using your GitHub account

3. Click **"Add New Project"** → Import your GitHub repository

4. In the **Environment Variables** section, add:
   ```
   WEB3FORMS_ACCESS_KEY = your_key_here
   NEXT_PUBLIC_WHATSAPP_NUMBER = 91XXXXXXXXXX
   NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
   ```

5. Click **Deploy** — Vercel handles everything automatically

6. **Add a custom domain** (optional): In your project settings → Domains → Add your domain

Every time you push to `main`, Vercel automatically redeploys.

---

## Deploying to Netlify (Backup)

1. Install Netlify CLI: `npm install -g netlify-cli`

2. Add a `netlify.toml` at the project root:
   ```toml
   [build]
   command = "npm run build"
   publish = ".next"

   [[plugins]]
   package = "@netlify/plugin-nextjs"
   ```

3. Install the Next.js plugin: `npm install -D @netlify/plugin-nextjs`

4. Deploy:
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

5. Set environment variables in the Netlify dashboard under **Site Settings → Environment Variables**

---

## Customising the Site

### Change agent name / contact details

- **Name**: Search & replace `Arjun Sharma` across all files
- **Email**: Replace `arjun@prestigeproperties.in`
- **Address**: Update in `Footer.tsx` and `contact/page.tsx`
- **WhatsApp**: Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`

### Change site name

Replace `Prestige Properties` in:
- `app/layout.tsx` (metadata)
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`

### Change the colour palette

Edit `tailwind.config.ts` — the `navy` and `gold` colour scales define the entire theme.

### Change the hero image

In `components/home/Hero.tsx`, update the `src` prop on the `<Image>` component.
Use any Unsplash URL in the format: `https://images.unsplash.com/photo-PHOTOID?w=1920&q=90`

### Add a Google Analytics ID

Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in `.env.local`, then add the Google Analytics `<Script>` tag in `app/layout.tsx`.
