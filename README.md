<div align="center">

# LinkForge Starter Kit

### Ship your SaaS in a weekend, not a month.

A production-ready Next.js SaaS boilerplate wrapped around a fully functional **link-in-bio** app. Authentication, payments, database, analytics, dark mode — everything wired up and ready to deploy.

**Stop building boilerplate. Start shipping products.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](#)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![Prisma 7](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](#)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](#)
[![License: Commercial](https://img.shields.io/badge/License-Commercial-green)](#license)

[Get Instant Access — $199 One-Time](#pricing)

---

</div>

## Why LinkForge Starter Kit?

Every SaaS needs the same foundation: auth, payments, a database, a landing page, a dashboard. You've built it before. You'll build it again. **Not this time.**

LinkForge Starter Kit gives you a **real, working SaaS application** — not a skeleton, not a TODO list, not a half-wired template. A complete link-in-bio product with users, subscriptions, analytics, and a polished UI that you can deploy today and start selling tomorrow.

**Use it as:**
- A ready-to-launch link-in-bio SaaS (deploy as-is and start earning)
- A battle-tested starting point for any SaaS project (rip out the link features, keep the infrastructure)
- A reference architecture for how production Next.js apps should be built

**What makes it different:**

| Other boilerplates | LinkForge Starter Kit |
|---|---|
| Auth scaffold with TODO comments | NextAuth v5 with credentials, JWT sessions, protected routes |
| Placeholder "Add your feature" dashboard | Full CRUD dashboard with analytics, link management, live preview |
| Stripe integration that almost works | Complete checkout flow + webhook handlers + subscription state |
| Generic landing page template | Polished marketing page with pricing, features, and CTAs |
| No real app logic to learn from | A complete SaaS you can study, extend, and ship |

---

## Features

### Core SaaS Infrastructure
- **NextAuth v5** — Credentials provider with JWT-based sessions, middleware-protected routes, and role-ready auth architecture
- **Stripe Subscriptions** — Checkout sessions, webhook handlers, subscription state management, and billing portal integration
- **Prisma 7 + SQLite** — Type-safe database layer with migrations. SQLite for zero-config dev, swap to PostgreSQL with one env variable
- **Landing Page** — Conversion-optimized marketing page with feature sections, pricing table, FAQ, and responsive hero
- **Dark Mode** — System-aware theme toggling with persistent user preference

### Link-in-Bio Application
- **Dashboard** — Full link CRUD (create, read, update, delete), drag-to-reorder, toggle visibility, and instant preview
- **Public Profile Pages** — Beautiful, shareable link-in-bio pages with 5 built-in themes
- **5 Custom Themes** — Minimal, Bold, Gradient, Neon, and Glass — switch with one click
- **Phone Preview** — Real-time device mockup right in the dashboard so you see exactly what your visitors see
- **Analytics Engine** — Page view tracking, per-link click analytics, and aggregated stats in the dashboard
- **Settings Page** — Profile management, avatar uploads, bio editing, theme selection, and account controls
- **Responsive Design** — Pixel-perfect on mobile, tablet, and desktop. Your users' pages look great everywhere

### Developer Experience
- **Next.js 16 App Router** — The latest React Server Components architecture with streaming and Suspense boundaries
- **Turbopack** — Blazing fast dev server and builds. No more waiting
- **TypeScript Everywhere** — Full type safety from the database layer through API routes to the UI
- **Tailwind CSS v4** — Utility-first styling with the newest Tailwind engine, CSS-first configuration, and zero runtime cost
- **Clean Project Structure** — Organized, intuitive folder layout that scales with your app

---

## Quick Start

Get running in under 2 minutes. Seriously.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/linkforge-starter-kit.git
cd linkforge-starter-kit

# 2. Install dependencies
npm install

# 3. Configure your environment
cp .env.example .env
# Open .env and fill in your Stripe keys, NextAuth secret, etc.

# 4. Run it
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're live. The database is seeded and ready.

> **Production deploy?** Push to Vercel. Set your environment variables. Done.

---

## What's Included

### Landing Page
A complete marketing page with hero section, feature grid, pricing tiers, FAQ accordion, footer with social links, and mobile-responsive navigation. Every section is a component you can customize or replace.

### Authentication System
- Sign up / Sign in with email and password
- JWT session management with secure token rotation
- Protected route middleware
- Password hashing with bcrypt
- Session context available throughout the app

### Stripe Integration
- **Checkout Sessions** — Users pick a plan, redirect to Stripe, come back as subscribers
- **Webhook Handler** — Listens for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` and keeps your DB in sync
- **Subscription Gating** — Check plan status server-side, gate features by tier
- **Billing Portal** — Let users manage their own subscriptions without your support inbox filling up

### Dashboard
- Link management table with inline editing
- Add, edit, delete, and reorder links
- Toggle link visibility (hide without deleting)
- Click analytics per link
- Real-time phone mockup preview
- Clean, distraction-free layout

### Public Profile Pages
- Custom slug-based URLs (`/u/yourname`)
- 5 switchable themes (Minimal, Bold, Gradient, Neon, Glass)
- Avatar, bio, and social links
- Click tracking on every link
- Mobile-first responsive design
- Open Graph meta tags for social sharing previews

### Analytics
- Page view counter per profile
- Individual link click tracking
- Aggregated dashboard stats
- Lightweight tracking — no third-party scripts, no cookies, no GDPR headaches

### Settings
- Update display name, bio, and avatar
- Change profile slug
- Switch profile theme
- Manage account details

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server Components, streaming, edge-ready |
| Build Tool | **Turbopack** | 10x faster than Webpack for dev |
| Language | **TypeScript 5.x** | Type safety from DB to DOM |
| Styling | **Tailwind CSS v4** | CSS-first config, zero runtime |
| Database | **Prisma 7 + SQLite** | Type-safe queries, zero-config dev |
| Auth | **NextAuth v5** | Industry standard, JWT sessions |
| Payments | **Stripe** | Subscriptions, webhooks, billing portal |
| Deployment | **Vercel-ready** | Push to deploy, zero config |

**Database note:** SQLite is included for instant local development with zero setup. When you're ready for production, swap the connection string to PostgreSQL — Prisma handles the rest. No code changes needed.

---

## Project Structure

```
linkforge-starter-kit/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data for development
├── public/
│   └── images/                # Static assets, default avatars
├── src/
│   ├── app/
│   │   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── links/         # Link CRUD
│   │   │   ├── analytics/     # Analytics dashboard
│   │   │   └── settings/      # Profile & account settings
│   │   ├── (landing)/         # Public marketing page
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth route handlers
│   │   │   ├── stripe/        # Stripe webhook & checkout
│   │   │   └── links/         # Link API endpoints
│   │   ├── u/[slug]/          # Public profile pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # Reusable UI primitives
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── landing/           # Landing page sections
│   │   └── themes/            # Profile theme components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── stripe.ts          # Stripe helpers
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── utils.ts           # Shared utilities
│   └── types/                 # TypeScript type definitions
├── .env.example               # Environment variable template
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

---

## Pricing

**LinkForge Starter Kit — $199 (one-time purchase)**

No subscriptions. No per-seat pricing. No hidden fees.

You get:
- The full source code — every file, every component, every line
- Free updates forever — new features, dependency bumps, fixes
- Use it for unlimited personal and commercial projects
- Access to a production-ready SaaS you can start selling today

> Think about it: you're spending $199 to save 40+ hours of boilerplate work. Your time is worth more than $5/hour.

**[Get Instant Access on Gumroad](https://your-store.gumroad.com/l/linkforge)**

---

## FAQ

**Do I need to know Next.js to use this?**
Basic familiarity with React and Next.js helps, but the code is clean, well-organized, and heavily commented. If you can read TypeScript, you can work with this boilerplate.

**Can I use this for a different SaaS idea?**
Absolutely. Rip out the link-in-bio features and keep the auth, payments, landing page, and dashboard infrastructure. The SaaS foundation is fully decoupled from the application logic.

**Is this just a template with TODO comments?**
No. This is a complete, working application with real features, real business logic, and a real user flow. Every integration is wired end-to-end. Sign up, subscribe, create links, view analytics — it all works.

**Can I swap SQLite for PostgreSQL?**
Yes. Change the `DATABASE_URL` in your `.env` file and update the Prisma provider. Run `npx prisma migrate dev` and you're on PostgreSQL. The queries don't change.

**Do I need a Stripe account?**
For payments, yes. Stripe is free to create and you only pay transaction fees when you start earning. For local development, Stripe test mode works with zero cost.

**Can I deploy somewhere other than Vercel?**
Yes. This is a standard Next.js app. Deploy to Vercel, Railway, Render, Fly.io, or any Node.js hosting provider. Vercel is the easiest path, not the only one.

**Is there a money-back guarantee?**
Yes. 30-day no-questions-asked refund. If it's not what you expected, email us and you'll get your money back.

**Do I get updates?**
Yes. Every update — new features, dependency upgrades, bug fixes — is included at no extra cost. Clone the repo once, pull updates forever.

---

## License

This is a **commercial license** product.

**You may:**
- Use the code for unlimited personal projects
- Use the code for unlimited commercial projects (including client work and SaaS products you sell)
- Modify the code in any way
- Deploy the code as a production application

**You may not:**
- Resell, redistribute, or share the source code as a boilerplate, template, or starter kit
- Include the source code in a competing product
- Transfer your license to another individual or organization

One purchase covers you for everything you build. No recurring fees.

---

<div align="center">

**Ready to stop building boilerplate and start shipping?**

[Get LinkForge Starter Kit — $199](https://your-store.gumroad.com/l/linkforge)

*Ship faster. Earn sooner. Build on a foundation that actually works.*

</div>
