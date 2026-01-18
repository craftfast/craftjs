import { headers } from "next/headers";
import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import * as schema from "@/lib/db/schema";
import { verifyWebhookSignature } from "@/lib/payments/dodo";

/**
 * Dodo Payments Webhook Handler
 * Handles subscription events from Dodo Payments
 */
export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("x-dodo-signature") || "";

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.type) {
      case "checkout.completed": {
        // Handle successful checkout
        const { customerId, subscriptionId, planId, userId } = event.data;
        console.log("Checkout completed:", {
          customerId,
          subscriptionId,
          planId,
          userId,
        });

        // TODO: Create subscription in database
        // await db.insert(schema.subscriptions).values({
        //   id: nanoid(),
        //   userId,
        //   planId,
        //   status: "active",
        //   dodoCustomerId: customerId,
        //   dodoSubscriptionId: subscriptionId,
        //   currentPeriodStart: new Date(),
        //   currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        // });

        break;
      }

      case "subscription.updated": {
        // Handle subscription updates
        const { subscriptionId, status, currentPeriodEnd } = event.data;
        console.log("Subscription updated:", {
          subscriptionId,
          status,
          currentPeriodEnd,
        });

        // TODO: Update subscription in database
        // await db
        //   .update(schema.subscriptions)
        //   .set({
        //     status,
        //     currentPeriodEnd: new Date(currentPeriodEnd),
        //     updatedAt: new Date(),
        //   })
        //   .where(eq(schema.subscriptions.dodoSubscriptionId, subscriptionId));

        break;
      }

      case "subscription.canceled": {
        // Handle subscription cancellation
        const { subscriptionId, canceledAt } = event.data;
        console.log("Subscription canceled:", { subscriptionId, canceledAt });

        // TODO: Update subscription in database
        // await db
        //   .update(schema.subscriptions)
        //   .set({
        //     status: "canceled",
        //     canceledAt: new Date(canceledAt),
        //     updatedAt: new Date(),
        //   })
        //   .where(eq(schema.subscriptions.dodoSubscriptionId, subscriptionId));

        break;
      }

      case "payment.failed": {
        // Handle payment failure
        const { subscriptionId, customerId } = event.data;
        console.log("Payment failed:", { subscriptionId, customerId });

        // TODO: Update subscription status and send notification
        // await db
        //   .update(schema.subscriptions)
        //   .set({
        //     status: "past_due",
        //     updatedAt: new Date(),
        //   })
        //   .where(eq(schema.subscriptions.dodoSubscriptionId, subscriptionId));

        break;
      }

      default:
        console.log("Unhandled webhook event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
