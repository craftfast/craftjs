import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Shield,
  Database,
  MessageSquare,
  CreditCard,
  BarChart3,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <span className="text-xl font-bold">CraftJS</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Log in
            </Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-6 pt-16 pb-8 md:pt-24 lg:pt-32">
          <div className="flex max-w-245 flex-col items-center gap-4 text-center">
            <span className="bg-muted rounded-full px-4 py-1.5 text-sm font-medium">
              Open Source · MIT License
            </span>
            <h1 className="text-4xl leading-tight font-bold tracking-tighter md:text-6xl lg:text-7xl">
              Build AI Apps
              <br />
              <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent">
                10x Faster
              </span>
            </h1>
            <p className="text-muted-foreground max-w-175 text-lg md:text-xl">
              An opinionated Next.js boilerplate with everything you need to
              ship AI-powered SaaS products. Authentication, payments, AI chat,
              and more — all wired up and ready to go.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/yourusername/craftjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Stop reinventing the wheel. Start with production-ready
              infrastructure.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Authentication"
              description="Better Auth with email/password and OAuth (Google, GitHub). Session management, protected routes, and more."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10" />}
              title="AI Chat"
              description="Vercel AI SDK with multi-provider support (OpenAI, Anthropic, Google). Streaming, tool calling, and token tracking."
            />
            <FeatureCard
              icon={<Database className="h-10 w-10" />}
              title="Database"
              description="Neon PostgreSQL with Drizzle ORM. Type-safe queries, migrations, and schema management."
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10" />}
              title="Payments"
              description="Dodo Payments integration with subscriptions, webhooks, and usage-based billing support."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10" />}
              title="Analytics"
              description="PostHog for product analytics and feature flags. Track user behavior and run experiments."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10" />}
              title="And More..."
              description="Cloudflare R2 storage, Upstash Redis caching, Resend emails, Tawk.to support, Trigger.dev jobs."
            />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="bg-muted/50 border-t py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Opinionated Tech Stack
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Built with the best tools for shipping fast
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {[
                "Next.js 15",
                "TypeScript",
                "Tailwind CSS",
                "shadcn/ui",
                "Drizzle ORM",
                "Neon",
                "Better Auth",
                "Vercel AI SDK",
                "Upstash Redis",
                "Cloudflare R2",
                "Resend",
                "PostHog",
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-background flex items-center justify-center rounded-lg border p-4 text-sm font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 md:py-24">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Ship?
            </h2>
            <p className="text-muted-foreground max-w-150 text-lg">
              Clone the repo, set up your environment variables, and start
              building your next AI-powered product in minutes.
            </p>
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span className="font-semibold">CraftJS</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Open source under MIT License. Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-lg border p-6">
      <div className="text-primary">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
