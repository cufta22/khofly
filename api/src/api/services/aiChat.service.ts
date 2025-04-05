import type { Context } from "elysia";

export type IAIModel = "gemini-2.0-flash";

interface IBody {
  prompt: string;
  model: IAIModel;
}

// POST - /ai/config
export const handleAIChat = async (ctx: Context) => {
  const { model, prompt } = ctx.body as IBody;

  if (!model || !prompt) {
    throw ctx.error(400, "Missing data in request");
  }

  try {
    if (["gemini-2.0-flash"].includes(model)) {
      console.log("source: Google AI");
    }
  } catch (error) {}
};
