import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getModel, isValidModel, DEFAULT_MODEL, type ModelId } from "@/lib/ai/models";
import { getSystemPrompt } from "@/lib/ai/prompts";
import { defaultTools } from "@/lib/ai/tools";
import { stepCountIs } from "ai";

// Vercel Edge Runtime - set max duration
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const {
      messages,
      modelId = DEFAULT_MODEL,
      systemPrompt,
      enableTools = true,
    }: {
      messages: UIMessage[];
      modelId?: string;
      systemPrompt?: string;
      enableTools?: boolean;
    } = body;

    // Validate model
    if (!isValidModel(modelId)) {
      return NextResponse.json({ error: `Invalid model: ${modelId}` }, { status: 400 });
    }

    // Get model configuration
    const modelConfig = getModel(modelId as ModelId);

    // Convert messages to model format
    const modelMessages = await convertToModelMessages(messages);

    // Create the streaming response
    const result = streamText({
      model: modelConfig.model,
      system: systemPrompt || getSystemPrompt("default"),
      messages: modelMessages,
      tools: enableTools ? defaultTools : undefined,
      stopWhen: stepCountIs(5), // Allow up to 5 tool calls
      onFinish: async ({ usage }) => {
        // Log usage for analytics/billing
        console.log("Chat completion finished:", {
          userId: session.user.id,
          modelId,
          usage,
        });

        // TODO: Save usage to database for billing
        // await db.insert(schema.usage).values({
        //   id: nanoid(),
        //   userId: session.user.id,
        //   type: "ai_tokens",
        //   amount: usage.totalTokens,
        //   metadata: JSON.stringify({ modelId, promptTokens: usage.promptTokens, completionTokens: usage.completionTokens }),
        // });
      },
    });

    // Return streaming response using UI message stream (v6 API)
    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
