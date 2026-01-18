import posthog from "posthog-js";

/**
 * PostHog Client-Side Analytics
 * Initialize in a client component or instrumentation file
 */

let posthogInitialized = false;

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (posthogInitialized) return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // We'll manually capture pageviews
    capture_pageleave: true,
    autocapture: true,
  });

  posthogInitialized = true;
}

/**
 * Identify a user
 */
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.identify(userId, properties);
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.capture(eventName, properties);
}

/**
 * Track a page view
 */
export function trackPageView(url?: string) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.capture("$pageview", {
    $current_url: url || window.location.href,
  });
}

/**
 * Reset user identity (on logout)
 */
export function resetUser() {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.reset();
}

/**
 * Check if a feature flag is enabled
 */
export function isFeatureEnabled(flagKey: string): boolean {
  if (typeof window === "undefined") return false;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return false;

  return posthog.isFeatureEnabled(flagKey) ?? false;
}

/**
 * Get feature flag value
 */
export function getFeatureFlag<T = unknown>(flagKey: string): T | undefined {
  if (typeof window === "undefined") return undefined;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return undefined;

  return posthog.getFeatureFlag(flagKey) as T | undefined;
}

export { posthog };
