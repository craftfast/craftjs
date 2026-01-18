import { PostHog } from "posthog-node";

/**
 * PostHog Server-Side Analytics
 * For server actions and API routes
 */

let posthogClient: PostHog | null = null;

function getPostHogClient(): PostHog | null {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      flushAt: 1, // Flush immediately in serverless
      flushInterval: 0,
    });
  }

  return posthogClient;
}

/**
 * Track a server-side event
 */
export async function trackServerEvent(
  distinctId: string,
  eventName: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const client = getPostHogClient();
  if (!client) return;

  client.capture({
    distinctId,
    event: eventName,
    properties,
  });

  // Flush in serverless environment
  await client.shutdown();
}

/**
 * Identify a user server-side
 */
export async function identifyServerUser(
  distinctId: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const client = getPostHogClient();
  if (!client) return;

  client.identify({
    distinctId,
    properties,
  });

  await client.shutdown();
}

/**
 * Get all feature flags for a user
 */
export async function getAllFeatureFlags(
  distinctId: string,
  groups?: Record<string, string>
): Promise<Record<string, boolean | string>> {
  const client = getPostHogClient();
  if (!client) return {};

  const flags = await client.getAllFlags(distinctId, { groups });
  await client.shutdown();

  return flags;
}

/**
 * Check if a feature is enabled server-side
 */
export async function isFeatureEnabledServer(
  distinctId: string,
  flagKey: string
): Promise<boolean> {
  const client = getPostHogClient();
  if (!client) return false;

  const enabled = await client.isFeatureEnabled(flagKey, distinctId);
  await client.shutdown();

  return enabled ?? false;
}

/**
 * Get feature flag value server-side
 */
export async function getFeatureFlagServer<T = unknown>(
  distinctId: string,
  flagKey: string
): Promise<T | undefined> {
  const client = getPostHogClient();
  if (!client) return undefined;

  const value = await client.getFeatureFlag(flagKey, distinctId);
  await client.shutdown();

  return value as T | undefined;
}
