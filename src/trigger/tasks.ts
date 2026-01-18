import { logger, task, wait } from "@trigger.dev/sdk/v3";

/**
 * Example: Send Welcome Email Task
 * Triggered after user signup
 */
export const sendWelcomeEmailTask = task({
  id: "send-welcome-email",
  maxDuration: 60, // 1 minute
  run: async (payload: { userId: string; email: string; name: string }) => {
    logger.info("Sending welcome email", { payload });

    // Simulate email sending delay
    await wait.for({ seconds: 1 });

    // TODO: Implement actual email sending
    // import { sendEmailTemplate } from "@/lib/email";
    // import { WelcomeEmail } from "@/lib/email/templates/welcome";
    // await sendEmailTemplate({
    //   to: payload.email,
    //   subject: "Welcome to CraftJS!",
    //   react: WelcomeEmail({ name: payload.name }),
    // });

    logger.info("Welcome email sent", { email: payload.email });

    return { success: true, email: payload.email };
  },
});

/**
 * Example: Process AI Batch Task
 * For processing multiple AI requests
 */
export const processAIBatchTask = task({
  id: "process-ai-batch",
  maxDuration: 300, // 5 minutes
  run: async (payload: {
    userId: string;
    prompts: string[];
    model: string;
  }) => {
    logger.info("Processing AI batch", {
      userId: payload.userId,
      promptCount: payload.prompts.length,
    });

    const results: string[] = [];

    for (const prompt of payload.prompts) {
      // TODO: Implement actual AI processing
      // const result = await generateText({
      //   model: getModel(payload.model).model,
      //   prompt,
      // });
      // results.push(result.text);

      results.push(`Processed: ${prompt}`);

      // Add small delay between requests
      await wait.for({ seconds: 0.1 });
    }

    logger.info("AI batch completed", {
      userId: payload.userId,
      resultCount: results.length,
    });

    return { success: true, results };
  },
});

/**
 * Example: Cleanup Old Chats Task
 * Scheduled task to clean up old chat data
 */
export const cleanupOldChatsTask = task({
  id: "cleanup-old-chats",
  maxDuration: 300, // 5 minutes
  run: async (payload: { daysOld: number }) => {
    logger.info("Cleaning up old chats", { daysOld: payload.daysOld });

    // TODO: Implement actual cleanup
    // const cutoffDate = new Date();
    // cutoffDate.setDate(cutoffDate.getDate() - payload.daysOld);
    //
    // const deleted = await db.delete(schema.chats)
    //   .where(lt(schema.chats.updatedAt, cutoffDate))
    //   .returning({ id: schema.chats.id });

    logger.info("Cleanup completed", { deletedCount: 0 });

    return { success: true, deletedCount: 0 };
  },
});

/**
 * Example: Sync Usage to Billing Task
 * Aggregate and sync usage data for billing
 */
export const syncUsageToBillingTask = task({
  id: "sync-usage-to-billing",
  maxDuration: 120, // 2 minutes
  run: async (payload: { userId: string; period: string }) => {
    logger.info("Syncing usage to billing", {
      userId: payload.userId,
      period: payload.period,
    });

    // TODO: Implement actual usage sync
    // 1. Aggregate usage from database
    // 2. Calculate billing amounts
    // 3. Update subscription/billing records

    logger.info("Usage sync completed", { userId: payload.userId });

    return { success: true };
  },
});
