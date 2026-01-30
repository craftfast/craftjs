# My Craft App

Built with [CraftJS](https://craftjs.dev) - an AI-powered app builder you can self-host anywhere.

## 🚀 Quick Start

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Start PostgreSQL with Docker
docker compose up -d

# 3. Push database schema
pnpm db:push

# 4. Start the app
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) - that's it! 🎉

## ✨ Features

- **AI App Builder** - Chat with AI to create pages, components, and features
- **Self-Hosted** - Runs on any laptop, VPS, or server
- **Local-First** - No external services required (PostgreSQL runs in Docker)
- **Full-Stack** - Auth, database, and API routes included

## 📦 What's Included

| Feature          | Technology                   | Status         |
| ---------------- | ---------------------------- | -------------- |
| **Database**     | PostgreSQL + Drizzle ORM     | ✅ Ready       |
| **Auth**         | Better Auth (email/password) | ✅ Ready       |
| **AI Chat**      | Vercel AI SDK                | 🔑 Add API key |
| **File Storage** | MinIO (S3-compatible)        | 📦 Optional    |
| **Email**        | SMTP / Resend                | 📦 Optional    |
| **Caching**      | Redis                        | 📦 Optional    |

## 🤖 Using AI Features

Add an AI API key to your `.env` file:

```env
# Option 1: OpenAI
OPENAI_API_KEY=sk-...

# Option 2: Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Option 3: Local AI (no API key needed!)
# Uncomment ollama in docker-compose.yml
# docker exec craftjs-ollama ollama pull codellama:7b
OLLAMA_BASE_URL=http://localhost:11434
```

Then chat with the AI to build your app:

- "Create a landing page with a hero section"
- "Add a contact form that saves to the database"
- "Build a dashboard with user analytics"

## 🛠 Development

```bash
# Run development server
pnpm dev

# Database operations
pnpm db:push     # Push schema changes
pnpm db:studio   # Open Drizzle Studio

# Code quality
pnpm lint        # Run ESLint
pnpm format      # Run Prettier
```

## 🐳 Docker Services

```bash
# Start all services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f
```

### Optional Services (uncomment in docker-compose.yml)

- **Redis** - Caching and rate limiting
- **MinIO** - S3-compatible file storage
- **Mailhog** - Email testing (catches all emails)
- **Ollama** - Local AI models

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── (auth)/            # Auth pages
│   ├── (chat)/            # AI chat interface
│   └── api/               # API routes
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities
│   ├── ai/              # AI tools & prompts
│   ├── auth/            # Better Auth config
│   └── db/              # Database & schemas
└── public/              # Static assets
```

## 🚀 Deployment

### Docker (Recommended)

```bash
# Build production image
docker build -t my-craft-app .

# Run with docker-compose
docker compose -f docker-compose.yml up -d
```

### Manual

```bash
pnpm build
pnpm start
```

## 📚 Documentation

For full documentation, visit [craftjs.dev](https://craftjs.dev)

## License

MIT
