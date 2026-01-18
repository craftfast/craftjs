# CraftJS

<div align="center">

![CraftJS](https://img.shields.io/badge/CraftJS-AI%20Boilerplate-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

**The best way to build a full-stack SaaS application** 🚀

[Documentation](https://craftjs.dev) • [Quick Start](#quick-start) • [Contributing](CONTRIBUTING.md)

</div>

---

## Quick Start

```bash
npx create-craft-app@latest my-app
cd my-app
cp .env.example .env
pnpm dev
```

## What's Inside?

This monorepo includes the following:

### Apps

- `apps/www` - Documentation site built with [Nextra](https://nextra.site)

### Packages

- `packages/create-craft-app` - CLI tool for scaffolding new projects

### Tooling

- `tooling/typescript` - Shared TypeScript configurations
- `tooling/eslint` - Shared ESLint configurations
- `tooling/prettier` - Shared Prettier configuration

## ✨ Features

- 🤖 **Multi-Provider AI** - OpenAI, Anthropic, and Google AI models with Vercel AI SDK 6
- 🔐 **Authentication** - Email/password + OAuth (Google, GitHub) with Better Auth
- 💾 **Database** - PostgreSQL with Neon serverless + Drizzle ORM
- 💳 **Payments** - Subscription billing with Dodo Payments
- 📧 **Transactional Emails** - React Email templates with Resend
- 🔄 **Background Jobs** - Trigger.dev for async tasks
- 📊 **Analytics** - PostHog for product analytics
- 💬 **Customer Support** - Tawk.to live chat integration
- 🎨 **UI Components** - shadcn/ui + Tailwind CSS v4
- 🌙 **Dark Mode** - System-aware theme switching
- ⚡ **Caching** - Upstash Redis for rate limiting & caching
- 📁 **File Storage** - Cloudflare R2 (S3-compatible)
- 🛡️ **Type Safety** - End-to-end TypeScript with strict mode
- ✅ **Code Quality** - ESLint, Prettier, Husky pre-commit hooks

## 🛠️ Tech Stack

| Category            | Technology                                                                        |
| ------------------- | --------------------------------------------------------------------------------- |
| **Framework**       | [Next.js 16](https://nextjs.org) with App Router & Turbopack                      |
| **Language**        | [TypeScript 5.9](https://www.typescriptlang.org/)                                 |
| **Styling**         | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Database**        | [Neon PostgreSQL](https://neon.tech/) + [Drizzle ORM](https://orm.drizzle.team/)  |
| **Authentication**  | [Better Auth](https://better-auth.com/)                                           |
| **AI**              | [Vercel AI SDK 6](https://ai-sdk.dev/) (OpenAI, Anthropic, Google)                |
| **Payments**        | [Dodo Payments](https://dodopayments.com/)                                        |
| **Email**           | [Resend](https://resend.com/) + [React Email](https://react.email/)               |
| **Cache**           | [Upstash Redis](https://upstash.com/)                                             |
| **Storage**         | [Cloudflare R2](https://www.cloudflare.com/products/r2/)                          |
| **Background Jobs** | [Trigger.dev](https://trigger.dev/)                                               |
| **Analytics**       | [PostHog](https://posthog.com/)                                                   |
| **Support**         | [Tawk.to](https://www.tawk.to/)                                                   |
| **Deployment**      | [Vercel](https://vercel.com/)                                                     |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   │   ├── auth/          # Better Auth handler
│   │   ├── chat/          # AI chat endpoint
│   │   └── webhooks/      # Payment webhooks
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/
│   ├── layout/            # Dashboard layout components
│   ├── providers/         # Context providers
│   ├── settings/          # Settings components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── ai/                # AI models, prompts, tools
│   ├── auth/              # Better Auth configuration
│   ├── cache/             # Redis client & rate limiters
│   ├── db/                # Drizzle schema & client
│   ├── email/             # Resend client & templates
│   ├── payments/          # Dodo Payments integration
│   ├── storage/           # R2 storage utilities
│   └── analytics/         # PostHog client
├── trigger/               # Trigger.dev background tasks
├── env.ts                 # Environment validation (T3 Env)
└── proxy.ts               # Next.js proxy (auth protection)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (recommend [Neon](https://neon.tech/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/craftjs.git
cd craftjs
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Fill in your environment variables (see [Environment Variables](#environment-variables) section).

4. **Set up the database**

```bash
pnpm db:push
```

5. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://..."

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# AI Providers (at least one required)
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GOOGLE_GENERATIVE_AI_API_KEY=""

# Payments (Dodo Payments)
DODO_API_KEY=""
DODO_WEBHOOK_SECRET=""

# Email (Resend)
RESEND_API_KEY=""
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# Cache (Upstash Redis)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""
R2_PUBLIC_URL=""

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"

# Customer Support (Tawk.to)
NEXT_PUBLIC_TAWK_PROPERTY_ID=""
NEXT_PUBLIC_TAWK_WIDGET_ID=""

# Background Jobs (Trigger.dev)
TRIGGER_SECRET_KEY=""
```

## 📜 Available Scripts

| Script              | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start development server with Turbopack |
| `pnpm build`        | Build for production                    |
| `pnpm start`        | Start production server                 |
| `pnpm lint`         | Run ESLint                              |
| `pnpm format`       | Format code with Prettier               |
| `pnpm format:check` | Check formatting                        |
| `pnpm db:push`      | Push schema changes to database         |
| `pnpm db:studio`    | Open Drizzle Studio                     |
| `pnpm db:generate`  | Generate migrations                     |
| `pnpm db:migrate`   | Run migrations                          |

## 🔐 Authentication

Better Auth provides:

- **Email/Password** - Built-in with email verification
- **OAuth** - Google and GitHub providers configured
- **Session Management** - Secure cookie-based sessions
- **Protected Routes** - Proxy-based route protection

## 🤖 AI Integration

The boilerplate supports multiple AI providers:

```typescript
// Available models
const models = {
  "gpt-4o": openai("gpt-4o"),
  "gpt-4o-mini": openai("gpt-4o-mini"),
  "claude-sonnet-4": anthropic("claude-sonnet-4-20250514"),
  "claude-3-5-haiku": anthropic("claude-3-5-haiku-latest"),
  "gemini-2-flash": google("gemini-2.0-flash"),
};
```

Features:

- Streaming responses
- Tool calling support
- Rate limiting per user
- Usage tracking

## 💳 Subscription Plans

Pre-configured plans with Dodo Payments:

| Plan           | Price  | Features                          |
| -------------- | ------ | --------------------------------- |
| **Free**       | $0/mo  | 100 AI requests, 10MB storage     |
| **Pro**        | $19/mo | 10,000 AI requests, 10GB storage  |
| **Enterprise** | $99/mo | Unlimited requests, 100GB storage |

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- AWS (Amplify, Lambda)
- Google Cloud Run
- Railway
- Render

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with these amazing open source projects:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Better Auth](https://better-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vercel AI SDK](https://ai-sdk.dev/)

---

<div align="center">

**[⬆ Back to Top](#craftjs---nextjs-ai-app-boilerplate)**

Made with ❤️ for the AI developer community

</div>
