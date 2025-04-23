import type { Context } from "elysia";

// GET - /ai/config
export const handleAIConfig = async (ctx: Context) => {
  // Check for API keys
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;

  return {
    error: false,
    message: "API AI provider keys",
    data: {
      hasGeminiKey,
    },
  };
};
