# Sanatani Autolikes

A premium, fully responsive landing site for **Sanatani Autolikes**, a Free Fire autolike service for India Server accounts.
Built with **React 18, Vite, TypeScript, Tailwind CSS and Lucide React**. No backend, no database, no payment gateway.

## Features

- Sticky responsive navbar with mobile menu and active-section highlighting
- Light and Dark themes (sun/moon toggle, saved in `localStorage`, no flash on reload)
- Hero, four pricing cards (₹130 Premium marked **POPULAR**), Daily Autolike info, Supported Server notice
- Community cards (Autolike Group and Main Channel), About, Contact and Footer
- Letter-by-letter animated headings, labels and prices (word-by-word for paragraphs), see `src/components/AnimatedText.tsx`
- Smoothly flowing blue → indigo → purple gradient on highlighted headings and prices (pure CSS, lighter stops in dark mode)
- Lightweight CSS animations (all respect `prefers-reduced-motion`)
- SEO: title, meta description, Open Graph and Twitter tags, favicon, semantic HTML

## Pricing, durations and links

Edit plans in [`src/data/plans.ts`](src/data/plans.ts) and shared links in [`src/data/links.ts`](src/data/links.ts).

The daily rate is exactly **200 likes per day** (`LIKES_PER_DAY`). Each plan's duration badge is calculated as
`ceil(totalLikes ÷ 200)` days, so it can never drift from the like quantity.

| Plan    | Price | Likes       | Duration | Prefilled Telegram message (shown in bold-style Unicode)  |
| ------- | ----- | ----------- | -------- | --------------------------------------------------------- |
| Demo    | ₹7    | 200+ Likes  | 1 Day    | Hello I want 7rs demo like. Please give me QR             |
| Starter | ₹35   | 1000+ Likes | 5 Days   | Hello I want 35rs autolike. Please give me QR             |
| Pro     | ₹80   | 3000+ Likes | 15 Days  | Hello I want 80rs autolike. Please give me QR             |
| Premium | ₹130  | 6600 Likes  | 33 Days  | Hello I want 130rs autolike. Please give me QR  **(POPULAR)** |

Each Buy button links to `https://t.me/TheRealSanatani?text=…`, where the message is converted to Unicode bold
letters by `toBold()` ([`src/utils/bold.ts`](src/utils/bold.ts)) and safely encoded with `encodeURIComponent`.
To change a message, edit the plain-text `message` field of that plan.

Buy buttons only open a Telegram chat with a prefilled message. The site never shows an order as paid or confirmed.

## Local development

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build and local preview:

```bash
npm run build      # type-checks (tsc), then outputs to dist/
npm run preview
```

## Deploy to Vercel

### Option A: Git + dashboard (recommended)

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. Go to <https://vercel.com/new> and import the repository.
3. Vercel detects **Vite** automatically. Confirm:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. Every push to the main branch redeploys automatically.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

`vercel.json` is included and already sets the framework, build command, output directory and asset caching.

## Project structure

```
├── index.html            # SEO / Open Graph meta, early theme script
├── public/               # favicon, social preview image, touch icon
├── src/
│   ├── components/       # Navbar, Hero, Pricing, PlanCard, DailyLikes, ServerSupport,
│   │                     # Community, About, Contact, Footer, Logo
│   ├── data/             # plans.ts, links.ts
│   ├── hooks/            # useTheme.ts, useReveal.ts
│   ├── utils/            # bold.ts (Unicode bold text for Telegram messages)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css         # Tailwind layers + shared component classes
├── tailwind.config.js
├── vite.config.ts
└── vercel.json
```

## Notes

- The site supports **India Server accounts only**, and says so clearly.
- No guaranteed delivery is claimed. Availability and order confirmation are handled by support on Telegram.
- Set your real domain in the `og:image` URL (make it absolute, e.g. `https://your-domain.com/og-image.png`) after deploying so social previews load on every platform.

## Major update: animated landing experience

New sections (in page order): hero with live countdown, **Live Player Profiles** carousel, **The Plans** (with benefit pills), **Payment Methods**, the **4 AM delivery** section (3D ring + warrior), **How It Works** (animated connector line), **Supported Server** (3D globe, India only) and a refreshed footer.

### Where to edit things
- `src/data/site.ts`
  - `DELIVERY` sets the delivery time shown in the countdown (default 4 AM IST, fixed UTC+5:30 offset).
  - `PAYMENT_METHODS` lists the methods shown. Set `enabled: false` (or remove an entry) to hide it. If nothing is enabled the whole section disappears. No payment gateway exists in this project; payments are arranged on Telegram.
- `src/data/profiles.ts` + `public/profiles/*.webp`: the carousel images. Add a file and one entry to add a profile.
- `src/data/plans.ts`: plans and Telegram Buy links (unchanged).
- `src/data/geo.ts`: simplified hand-authored geography for the globe (coarse by design). India is drawn with its official outline and is the only highlighted country.

### Performance and accessibility
The globe and ring are lazy-loaded canvases that start only when visible and pause when off-screen or the tab is hidden. All animations stop under `prefers-reduced-motion` (the globe and ring render a still frame).
