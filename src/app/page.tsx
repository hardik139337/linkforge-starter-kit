import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Link href="/" className="text-xl font-bold text-foreground">
          LinkForge
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            Pricing
          </a>
          <Link
            href="/dashboard"
            className="rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center px-6 pt-16 pb-20 text-center md:pt-24 md:pb-28 lg:pt-32">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          One Link.{" "}
          <span className="bg-gradient-to-r from-[#7c3aed] to-[#6366f1] bg-clip-text text-transparent">
            Infinite Possibilities.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg">
          The modern link-in-bio tool with powerful analytics, beautiful themes,
          and lightning-fast performance. Grow your audience with data-driven
          insights.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/api/auth/signin"
            className="rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7c3aed]/25 transition-opacity hover:opacity-90"
          >
            Get Started Free
          </Link>
          <Link
            href="/demo"
            className="rounded-lg border border-foreground/15 px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
          >
            See Demo
          </Link>
        </div>

        {/* Phone Mockup */}
        <div className="mt-16 flex justify-center">
          <div className="relative h-[520px] w-[280px] rounded-[2.5rem] border-[6px] border-foreground/15 bg-foreground/5 p-4 shadow-2xl">
            {/* Notch */}
            <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-foreground/15" />

            {/* Profile */}
            <div className="mt-6 flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#6366f1]" />
              <p className="mt-3 text-sm font-semibold text-foreground">
                @yourname
              </p>
              <p className="text-xs text-foreground/50">Creator & Developer</p>
            </div>

            {/* Mock Links */}
            <div className="mt-6 flex flex-col gap-3 px-2">
              {[
                "My Website",
                "YouTube Channel",
                "Twitter / X",
                "GitHub",
                "Newsletter",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-xl bg-gradient-to-r from-[#7c3aed]/10 to-[#6366f1]/10 py-3 text-center text-xs font-medium text-foreground/80"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            Everything you need to grow
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-foreground/50">
            Powerful features designed for creators, developers, and businesses.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-[#7c3aed]/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7c3aed]/10 text-lg">
                📊
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Powerful Analytics
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Track clicks, referrers, locations, and devices in real-time.
                Understand your audience with detailed insights and charts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-[#7c3aed]/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7c3aed]/10 text-lg">
                🎨
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Beautiful Themes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Choose from professionally designed themes or create your own.
                Match your brand with custom colors, fonts, and layouts.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-[#7c3aed]/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7c3aed]/10 text-lg">
                ⚡
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Lightning Fast
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Built on edge infrastructure for sub-100ms load times. Your
                audience never waits, no matter where they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-foreground/50">
            Start free. Upgrade when you need more.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8">
              <h3 className="text-lg font-semibold text-foreground">Free</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-sm text-foreground/50">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "5 links",
                  "Basic analytics",
                  "Default themes",
                  "LinkForge subdomain",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="text-[#7c3aed]">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/api/auth/signin"
                className="mt-8 block rounded-lg border border-foreground/15 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-2xl border border-[#7c3aed]/40 bg-gradient-to-b from-[#7c3aed]/5 to-transparent p-8">
              <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-3 py-0.5 text-xs font-medium text-white">
                Popular
              </span>
              <h3 className="text-lg font-semibold text-foreground">Pro</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">$9</span>
                <span className="text-sm text-foreground/50">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited links",
                  "Advanced analytics",
                  "Custom themes",
                  "Priority support",
                  "Custom domain",
                  "Remove branding",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="text-[#7c3aed]">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/api/auth/signin"
                className="mt-8 block rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-8 py-14 text-center md:px-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to grow your audience?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/80">
            Join thousands of creators who use LinkForge to connect with their
            audience. Set up your page in under 2 minutes.
          </p>
          <Link
            href="/api/auth/signin"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[#7c3aed] transition-opacity hover:opacity-90"
          >
            Sign Up Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-foreground/50">
            &copy; {new Date().getFullYear()} LinkForge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
