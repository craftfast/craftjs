import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables schema
   *
   * LOCAL-FIRST: Only DATABASE_URL and BETTER_AUTH_* are required.
   * Everything else is optional and can be added later.
   */
  server: {
    // ============================================
    // REQUIRED - Core functionality
    // ============================================

    // Database - works with any PostgreSQL (Docker, local, cloud)
    DATABASE_URL: z.string().min(1),

    // Auth - Better Auth configuration
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),

    // ============================================
    // OPTIONAL - Add when you need them
    // ============================================

    // OAuth providers (optional - basic auth works without these)
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),

    // AI Providers (optional - add your API keys to enable AI features)
    OPENAI_API_KEY: z.string().optional(),
    ANTHROPIC_API_KEY: z.string().optional(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),

    // Local AI with Ollama (optional - for fully local AI)
    OLLAMA_BASE_URL: z.string().url().optional(),

    // Storage - S3-compatible (optional - use MinIO for self-hosted)
    S3_ENDPOINT: z.string().url().optional(),
    S3_ACCESS_KEY_ID: z.string().optional(),
    S3_SECRET_ACCESS_KEY: z.string().optional(),
    S3_BUCKET_NAME: z.string().optional(),
    S3_REGION: z.string().optional(),

    // Legacy Cloudflare R2 support
    CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
    R2_ACCESS_KEY_ID: z.string().optional(),
    R2_SECRET_ACCESS_KEY: z.string().optional(),
    R2_BUCKET_NAME: z.string().optional(),

    // Redis (optional - for caching and rate limiting)
    REDIS_URL: z.string().optional(),

    // Legacy Upstash support
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    // Email (optional - use local SMTP or Resend)
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    EMAIL_FROM: z.string().optional(),

    // Legacy Resend support
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().email().optional(),

    // Payments (optional)
    DODO_API_KEY: z.string().optional(),
    DODO_WEBHOOK_SECRET: z.string().optional(),

    // Background jobs (optional)
    TRIGGER_SECRET_KEY: z.string().optional(),

    // Node environment
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Client-side environment variables schema
   */
  client: {
    // App URL (required)
    NEXT_PUBLIC_APP_URL: z.string().url(),

    // Analytics (optional)
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),

    // Chat widget (optional)
    NEXT_PUBLIC_TAWK_PROPERTY_ID: z.string().optional(),
    NEXT_PUBLIC_TAWK_WIDGET_ID: z.string().optional(),
  },

  /**
   * Runtime environment variables mapping
   */
  runtimeEnv: {
    // Required
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    // OAuth (optional)
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

    // AI Providers (optional)
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL,

    // Storage - S3-compatible (optional)
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,

    // Legacy Cloudflare R2
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,

    // Redis (optional)
    REDIS_URL: process.env.REDIS_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

    // Email (optional)
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,

    // Payments (optional)
    DODO_API_KEY: process.env.DODO_API_KEY,
    DODO_WEBHOOK_SECRET: process.env.DODO_WEBHOOK_SECRET,

    // Background jobs (optional)
    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,

    // Analytics (optional)
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    // Chat widget (optional)
    NEXT_PUBLIC_TAWK_PROPERTY_ID: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
    NEXT_PUBLIC_TAWK_WIDGET_ID: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,

    // System
    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * Skip validation during build (useful for Docker builds)
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION || process.env.NODE_ENV === "production",

  /**
   * Allow empty strings for optional variables
   */
  emptyStringAsUndefined: true,
});
