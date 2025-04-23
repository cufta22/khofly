import type { Context } from "elysia";

export type IAIModel = "gemini-2.0-flash";

interface IBody {
  model: IAIModel;
  messages: {
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    isGenerating: boolean;
  }[];
  // Model params
  temperature: number;
  max_tokens: number;
  system_instruction: string;
}

const GEMINI_API_URLS = {
  // Text generation
  "gemini-2.0-flash":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse",
  "gemini-2.0-flash-lite":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:streamGenerateContent?alt=sse",
  "gemini-2.5-pro-preview":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:streamGenerateContent?alt=sse",
  "gemini-2.5-pro-experimental":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-experimental-03-25:streamGenerateContent?alt=sse",

  // Image generation
  "gemini-2.0-flash-exp-image-generation":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent",
  "imagen-3.0-generate-002":
    "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict",
};

// POST - /ai/config
export const handleAIChat = async (ctx: Context) => {
  const { model, messages, temperature, max_tokens, system_instruction } = ctx.body as IBody;

  if (!model || !prompt) {
    throw ctx.error(400, "Missing data in request");
  }

  // --------------------------------------------------------------------------------------------------------------
  // Google AI - Text Generation
  // --------------------------------------------------------------------------------------------------------------
  if (
    [
      "gemini-2.5-pro-preview",
      "gemini-2.5-pro-experimental",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
    ].includes(model)
  ) {
    if (!process.env.GEMINI_API_KEY) throw ctx.error(400, "Gemini API key is missing");

    // Set up headers for Server-Sent Events (SSE)
    ctx.set.headers["content-type"] = "text/event-stream";
    ctx.set.headers["cache-control"] = "no-cache";
    ctx.set.headers["connection"] = "keep-alive";

    // Prepare the request payload for Gemini API
    const payload = {
      system_instruction: {
        parts: [
          {
            text: system_instruction || "",
          },
        ],
      },
      contents: [
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [
            {
              text: msg.content,
            },
          ],
        })),
      ],
      generationConfig: {
        temperature: temperature,
        maxOutputTokens: max_tokens,
        // topP: 0.95,
        // topK: 10,
      },
    };

    // Get gemini URL
    const geminiApiUrl = GEMINI_API_URLS[model];

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Make a direct API call to Gemini with streaming
          const response = await fetch(`${geminiApiUrl}&key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorData = await response.json();
            // console.log(errorData);

            throw ctx.error(400, `${JSON.stringify(errorData?.message)}`);
          }

          // Check if we have a readable stream from the response
          if (response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            // Process the stream chunks
            while (true) {
              const { done, value } = await reader.read();

              if (done) break;

              // Decode the chunk
              const chunk = decoder.decode(value, { stream: true });

              // Parse JSON objects separated by newlines
              const lines = chunk.split("\n").filter((line) => line.trim());

              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const jsonData = line.slice(6);
                  if (jsonData === "[DONE]") {
                    continue;
                  }

                  const data = JSON.parse(jsonData);
                  // Extract text from Gemini response structure
                  let text = "";

                  // Navigate through the response structure
                  if (data?.candidates?.[0]?.content?.parts) {
                    for (const part of data.candidates[0].content.parts) {
                      if (part.text) {
                        text += part.text;
                      }
                    }
                  }

                  if (text) {
                    // Send the extracted text to the client
                    controller.enqueue(`data: ${JSON.stringify({ text })}\n\n`);
                  }
                }
              }
            }
          }

          // Signal end of stream
          controller.enqueue("data: [DONE]\n\n");
          controller.close();
        } catch (error: any) {
          console.log(`Err in try catch`);
          console.log(error);

          controller.enqueue(
            `data: ${JSON.stringify({ error: "An error occurred during streaming" })}\n\n`
          );
          controller.error(error);
          controller.close();

          // throw ctx.error(400, error?.response || "Streaming error");
        }
      },
      cancel(reason) {
        // ... logic to handle cancellation ...
        console.log("Cancelled");

        console.log(reason);
      },
    });

    return stream;
  }
};
