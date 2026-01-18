/**
 * Dodo Payments Client
 * For subscription billing and one-time payments
 */

// Payment plan configuration
export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number; // in cents
  priceYearly: number; // in cents
  features: string[];
  limits: {
    aiTokensPerMonth: number;
    storageBytes: number;
    apiCallsPerDay: number;
  };
}

// Default plans - customize these for your app
export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals getting started",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["100 AI messages/month", "1GB storage", "Basic support"],
    limits: {
      aiTokensPerMonth: 10000,
      storageBytes: 1024 * 1024 * 1024, // 1GB
      apiCallsPerDay: 100,
    },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and small teams",
    priceMonthly: 1900, // $19
    priceYearly: 19000, // $190 (2 months free)
    features: [
      "Unlimited AI messages",
      "10GB storage",
      "Priority support",
      "Advanced AI models",
      "API access",
    ],
    limits: {
      aiTokensPerMonth: 1000000,
      storageBytes: 10 * 1024 * 1024 * 1024, // 10GB
      apiCallsPerDay: 10000,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    priceMonthly: 9900, // $99
    priceYearly: 99000, // $990 (2 months free)
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "Custom integrations",
      "SSO & SAML",
      "SLA guarantee",
    ],
    limits: {
      aiTokensPerMonth: -1, // unlimited
      storageBytes: -1, // unlimited
      apiCallsPerDay: -1, // unlimited
    },
  },
];

/**
 * Dodo Payments API helpers
 * Note: Replace with actual Dodo Payments SDK when available
 */

const DODO_API_URL = "https://api.dodopayments.com"; // Replace with actual URL

interface DodoCustomer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

interface DodoSubscription {
  id: string;
  customerId: string;
  planId: string;
  status: "active" | "canceled" | "past_due" | "trialing" | "paused";
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

/**
 * Create or get a Dodo customer
 */
export async function getOrCreateCustomer(
  email: string,
  name?: string,
  userId?: string
): Promise<DodoCustomer | null> {
  if (!process.env.DODO_API_KEY) {
    console.warn("Dodo Payments not configured");
    return null;
  }

  // TODO: Implement actual Dodo Payments API call
  // This is a placeholder implementation
  const response = await fetch(`${DODO_API_URL}/customers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DODO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
      metadata: { userId },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  return response.json();
}

/**
 * Create a checkout session
 */
export async function createCheckoutSession(
  customerId: string,
  planId: string,
  billingCycle: "monthly" | "yearly",
  successUrl: string,
  cancelUrl: string
): Promise<{ url: string } | null> {
  if (!process.env.DODO_API_KEY) {
    console.warn("Dodo Payments not configured");
    return null;
  }

  // TODO: Implement actual Dodo Payments API call
  const response = await fetch(`${DODO_API_URL}/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DODO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId,
      planId,
      billingCycle,
      successUrl,
      cancelUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create checkout session");
  }

  return response.json();
}

/**
 * Get subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<DodoSubscription | null> {
  if (!process.env.DODO_API_KEY) {
    console.warn("Dodo Payments not configured");
    return null;
  }

  // TODO: Implement actual Dodo Payments API call
  const response = await fetch(`${DODO_API_URL}/subscriptions/${subscriptionId}`, {
    headers: {
      Authorization: `Bearer ${process.env.DODO_API_KEY}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  cancelAtPeriodEnd = true
): Promise<boolean> {
  if (!process.env.DODO_API_KEY) {
    console.warn("Dodo Payments not configured");
    return false;
  }

  // TODO: Implement actual Dodo Payments API call
  const response = await fetch(`${DODO_API_URL}/subscriptions/${subscriptionId}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DODO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cancelAtPeriodEnd }),
  });

  return response.ok;
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!process.env.DODO_WEBHOOK_SECRET) {
    console.warn("Dodo webhook secret not configured");
    return false;
  }

  // TODO: Implement actual signature verification
  // This typically involves HMAC-SHA256 verification
  return true;
}

/**
 * Check if Dodo Payments is configured
 */
export function isDodoConfigured(): boolean {
  return !!process.env.DODO_API_KEY;
}

/**
 * Get plan by ID
 */
export function getPlanById(planId: string): PaymentPlan | undefined {
  return PAYMENT_PLANS.find((plan) => plan.id === planId);
}
