# Deploy & Launch Checklist — Step by Step

## Step 1: Deploy to Vercel (5 minutes)

1. Go to https://vercel.com and sign in with GitHub
2. Click "New Project" → Import `hardik139337/linkforge-starter-kit`
3. Configure environment variables:
   ```
   DATABASE_URL=file:./prisma/dev.db
   NEXTAUTH_SECRET=<run: openssl rand -base64 32>
   NEXTAUTH_URL=https://your-app.vercel.app
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
4. Add build command: `npx prisma generate && next build`
5. Click Deploy

## Step 2: Set up Stripe (10 minutes)

1. Go to https://dashboard.stripe.com → Products → Create Product
2. Create "Pro Plan" — $9/month recurring
3. Note the Price ID (price_xxx)
4. Update `src/lib/stripe.ts` with your Price ID
5. Go to Webhooks → Add Endpoint
   - URL: `https://your-app.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
6. Copy the Webhook Signing Secret → add to Vercel env vars
7. Redeploy

## Step 3: Create Gumroad Product (10 minutes)

1. Go to https://gumroad.com and create an account
2. Click "Create a Product"
3. Copy the listing content from `LAUNCH-KIT/GUMROAD-LISTING.md`
4. Upload screenshots of the dashboard, landing page, and profile themes
5. Set price: $199 (or pay-what-you-want with $49 minimum)
6. Upload the source code ZIP (run `git archive --format=zip HEAD -o linkforge-starter-kit.zip`)
7. Publish

## Step 4: Post on Social Media (30 minutes)

Copy content from `LAUNCH-KIT/SOCIAL-POSTS.md`:

1. **Twitter/X** — Post the thread (6 tweets)
2. **Reddit** — Post to r/SideProject, r/nextjs
3. **Hacker News** — Submit as "Show HN"
4. **LinkedIn** — Post the article
5. **Dev.to** — Write the article
6. **Indie Hackers** — Post in the community

## Step 5: Product Hunt Launch (schedule for Tuesday-Thursday)

1. Go to https://producthunt.com → Submit Product
2. Copy content from `LAUNCH-KIT/PRODUCTHUNT-DRAFT.md`
3. Upload 5 screenshots (dashboard, landing, profile, analytics, pricing)
4. Schedule for 12:01 AM PST on a Tuesday-Thursday
5. Post the maker comment immediately after launch
6. Reply to every comment within 30 minutes

## Step 6: Enable GitHub Sponsors (alternative revenue)

1. Go to https://github.com/sponsors/accounts
2. Set up sponsorship tiers: $5, $10, $25, $49
3. Add a "Sponsor" button to the README

## Revenue Projections

| Channel | Price | Sales needed for $10k |
|---|---|---|
| Gumroad | $199 | 50 sales |
| Gumroad (pay-what-you-want, avg $79) | $79 avg | 127 sales |
| SaaS subscriptions ($9/mo) | $9/mo | 1,111 subscribers ($10k/mo) |
| GitHub Sponsors | $5-49 | Variable |
| Combined | Mixed | More achievable |

## Realistic Timeline

- **Week 1**: Deploy, set up Gumroad, post on Reddit/HN/Twitter
- **Week 2-4**: Product Hunt launch, Dev.to article, iterate based on feedback
- **Month 2-3**: Build audience, SEO, content marketing
- **Month 3-6**: Consistent sales from organic traffic

$10k is achievable in 3-6 months with consistent marketing and a good product. The first $1k usually comes in the first month if you launch well.
