import type { Context } from "elysia";

interface IBody {
  model: string;
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

const GEMINI_API_URLS: { [key in string]: string } = {
  // Text generation
  "gemini-3-pro-preview":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:streamGenerateContent?alt=sse",
  "gemini-3-flash-preview":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:streamGenerateContent?alt=sse",
  "gemini-2.5-pro":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:streamGenerateContent?alt=sse",
  "gemini-2.5-flash":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse",

  // Image generation
  "gemini-3-pro-image-preview":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent",
  "gemini-2.5-flash-image":
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
  "imagen-4.0-imagen-4.0-generate-001":
    "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-imagen-4.0-generate-001:predict",
};

// POST - /ai/config
export const handleAIChat = async (ctx: Context) => {
  const { model, messages, temperature, max_tokens, system_instruction } = ctx.body as IBody;

  if (!model || !prompt) {
    throw new Error("Missing data in request");
  }

  // --------------------------------------------------------------------------------------------------------------
  // Google AI - Text Generation
  // --------------------------------------------------------------------------------------------------------------
  if (
    [
      // Text generation
      "gemini-3-pro-preview",
      "gemini-3-flash-preview",
      "gemini-2.5-pro",
      "gemini-2.5-flash",
    ].includes(model)
  ) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing");
    }

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
    const geminiApiUrl = GEMINI_API_URLS?.[model];

    if (!geminiApiUrl) {
      throw new Error("No Gemini URL");
    }

    // Set up headers for Server-Sent Events (SSE)
    ctx.set.headers["content-type"] = "text/event-stream";
    ctx.set.headers["cache-control"] = "no-cache";
    ctx.set.headers["connection"] = "keep-alive";

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Make a direct API call to Gemini with streaming
          const response = await fetch(`${geminiApiUrl}`, {
            method: "POST",
            headers: {
              "x-goog-api-key": process.env.GEMINI_API_KEY || "",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);

            throw new Error(`${errorData?.status}`);
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
                console.log("line:");
                console.log(line);

                if (line.startsWith("data: ")) {
                  const jsonData = line.slice(6);
                  if (jsonData === "[DONE]") {
                    continue;
                  }
                  console.log("jsonData");
                  console.log(jsonData);

                  const data = JSON.parse(jsonData);
                  // Extract text from Gemini response structure
                  let text = "";

                  console.log("data");
                  console.log(data);

                  // Navigate through the response structure
                  if (data?.candidates?.[0]?.content?.parts) {
                    for (const part of data.candidates[0].content.parts) {
                      if (part.text) {
                        text += part.text;
                      }
                    }
                  }
                  console.log(text);

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
          console.log(error);

          controller.enqueue(
            `data: ${JSON.stringify({ error: "An error occurred during streaming" })}\n\n`,
          );
          controller.error(error);
          controller.close();

          throw new Error(error?.response || "Streaming error");
        }
      },
      cancel(reason) {
        // ... logic to handle cancellation ...
      },
    });

    return stream;
  }
};
