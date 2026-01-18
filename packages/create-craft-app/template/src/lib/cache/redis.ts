import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

/**
 * Upstash Redis Client
 * For caching, rate limiting, and real-time features
 */

// Initialize Redis client (only if credentials are available)
function getRedisClient(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export const redis = getRedisClient();

/**
 * Rate limiters for different use cases
 */

// General API rate limiter: 100 requests per 10 seconds
export const apiRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "10 s"),
      analytics: true,
      prefix: "ratelimit:api",
    })
  : null;

// AI chat rate limiter: 20 requests per minute
export const chatRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 m"),
      analytics: true,
      prefix: "ratelimit:chat",
    })
  : null;

// Auth rate limiter: 10 attempts per 15 minutes
export const authRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "15 m"),
      analytics: true,
      prefix: "ratelimit:auth",
    })
  : null;

/**
 * Check rate limit and return result
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  if (!limiter) {
    // If rate limiting is not configured, allow all requests
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

/**
 * Cache helpers
 */

// Get cached value
export async function getCached<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  return redis.get<T>(key);
}

// Set cached value with TTL (in seconds)
export async function setCached<T>(key: string, value: T, ttlSeconds = 3600): Promise<void> {
  if (!redis) return;
  await redis.set(key, value, { ex: ttlSeconds });
}

// Delete cached value
export async function deleteCached(key: string): Promise<void> {
  if (!redis) return;
  await redis.del(key);
}

// Get or set cached value
export async function getOrSetCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 3600
): Promise<T> {
  if (!redis) {
    return fetcher();
  }

  const cached = await redis.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  const value = await fetcher();
  await redis.set(key, value, { ex: ttlSeconds });
  return value;
}

/**
 * Check if Redis is configured
 */
export function isRedisConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
