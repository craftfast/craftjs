import Link from "next/link";
import {
  ArrowRight,
  Github,
  Zap,
  Shield,
  Database,
  CreditCard,
  Mail,
  Bot,
  Layers,
  Cloud,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { CraftLogo } from "@/components/craft-logo";

const features = [
  {
    icon: Bot,
    title: "AI Ready",
    description: "OpenAI, Anthropic, Google AI with Vercel AI SDK 6.",
  },
  {
    icon: Shield,
    title: "Auth",
    description: "Email + OAuth with Better Auth. Secure by default.",
  },
  {
    icon: Database,
    title: "Database",
    description: "PostgreSQL + Neon serverless with Drizzle ORM.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Subscription billing with Dodo Payments.",
  },
  {
    icon: Mail,
    title: "Email",
    description: "React Email templates with Resend delivery.",
  },
  {
    icon: Zap,
    title: "Background Jobs",
    description: "Async processing with Trigger.dev.",
  },
  {
    icon: Cloud,
    title: "Storage",
    description: "File uploads with Cloudflare R2.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Product analytics with PostHog.",
  },
];

const stack = [
  "Next.js 16",
  "TypeScript 5.9",
  "Tailwind v4",
  "shadcn/ui",
  "Drizzle ORM",
  "Better Auth",
  "Vercel AI SDK",
  "Turbopack",
];

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <nav className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <CraftLogo className="text-lg" />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/docs"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Docs
              </Link>
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Features
              </Link>
              <a
                href="https://github.com/craftfast/craftjs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                GitHub
              </a>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <a
                  href="https://github.com/craftfast/craftjs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Star
                </a>
              </Button>
              <Button size="sm" asChild>
                <Link href="/docs/installation">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Subtle grid background */}
        <div className="grid-pattern grid-fade absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            {/* Open source badge */}
            <div className="animate-fade-in mb-8 inline-flex items-center gap-2">
              <Badge variant="success">Open Source</Badge>
              <span className="text-muted-foreground text-sm">MIT License</span>
            </div>

            {/* Headline */}
            <h1 className="text-foreground animate-fade-in animation-delay-100 mb-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Ship AI apps
              <br />
              <span className="text-muted-foreground">in days, not weeks</span>
            </h1>

            {/* Subheadline */}
            <p className="text-muted-foreground animate-fade-in animation-delay-200 mb-8 max-w-xl text-lg">
              The open-source Next.js boilerplate with auth, payments, AI, database, and everything
              you need to launch.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in animation-delay-300 mb-12 flex flex-col gap-3 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/docs/installation">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a
                  href="https://github.com/craftfast/craftjs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>

            {/* Terminal preview */}
            <div className="animate-fade-in animation-delay-400">
              <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-neutral-500">terminal</span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <span className="text-neutral-200">npx create-craft-app my-app</span>
                  </div>
                  <div className="mt-2 text-neutral-500">
                    <span className="text-neutral-400">→</span> Creating your CraftJS app...
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-emerald-400">✓</span> Dependencies installed
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-emerald-400">✓</span> Environment configured
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-emerald-400">✓</span> Ready to build!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Pills */}
      <section className="border-border bg-muted/50 border-y py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="text-muted-foreground bg-card border-border rounded-full border px-3 py-1.5 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Pre-configured integrations so you can focus on building your product.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group border-border bg-card hover:border-muted-foreground/30 rounded-xl border p-6 transition-colors"
              >
                <div className="bg-muted group-hover:bg-accent mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                  <feature.icon className="text-muted-foreground h-5 w-5" />
                </div>
                <h3 className="text-foreground mb-1 font-medium">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Open Source */}
      <section className="bg-muted/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="success" className="mb-4">
                Open Source
              </Badge>
              <h2 className="text-foreground mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                Free forever.
                <br />
                No strings attached.
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                CraftJS is completely free and open source under the MIT license. Use it for
                personal projects, startups, or enterprise applications. No hidden costs, no premium
                tiers.
              </p>
              <div className="space-y-4">
                {[
                  "Full source code access",
                  "No vendor lock-in",
                  "Community driven",
                  "Regular updates",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <svg
                        className="h-3 w-3 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-secondary-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-12">
              <div className="bg-card border-border rounded-xl border p-8">
                <div className="mb-6 flex items-center gap-4">
                  <Layers className="text-muted-foreground h-8 w-8" />
                  <div>
                    <div className="text-foreground font-semibold">Save 18+ hours</div>
                    <div className="text-muted-foreground text-sm">on every new project</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-border flex items-center justify-between border-b py-2">
                    <span className="text-muted-foreground">Auth Setup</span>
                    <span className="text-foreground font-medium">4+ hrs</span>
                  </div>
                  <div className="border-border flex items-center justify-between border-b py-2">
                    <span className="text-muted-foreground">Payment Integration</span>
                    <span className="text-foreground font-medium">6+ hrs</span>
                  </div>
                  <div className="border-border flex items-center justify-between border-b py-2">
                    <span className="text-muted-foreground">Email Templates</span>
                    <span className="text-foreground font-medium">3+ hrs</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">AI Integration</span>
                    <span className="text-foreground font-medium">5+ hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to ship?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
              Get started with CraftJS in minutes. Clone, configure, and start building.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/docs/installation">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a
                  href="https://github.com/craftfast/craftjs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <CraftLogo />
              <span className="text-muted-foreground text-sm">Open source under MIT</span>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/docs"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Docs
              </Link>
              <a
                href="https://github.com/craftfast/craftjs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://x.com/sudheerdotai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
