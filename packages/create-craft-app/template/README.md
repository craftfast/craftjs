# My Craft App

Built with [Craft.js](https://craftjs.dev) - the best way to build a full-stack SaaS application.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended)

### Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your configuration.

4. Push database schema:

```bash
pnpm db:push
```

5. Start development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 16
- **Authentication**: Better Auth
- **Database**: Drizzle ORM + Neon
- **Styling**: Tailwind CSS 4
- **Email**: Resend
- **Payments**: DodoPayments
- **AI**: Vercel AI SDK
- **Analytics**: PostHog

## Documentation

For full documentation, visit [craftjs.dev](https://craftjs.dev).

## License

MIT
