import { useInstanceStore } from "@store/instance";
import useToast from "@hooks/use-toast";

import { useEffect, useRef, useState } from "react";
import { useAIChatStore } from "@store/aichat";

interface Args {
  source: "cf" | "google";
  model: string;
  messages: any;
}

// Not an swr this time
const useAIChatAPI = () => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Ref to keep track of the response being streamed
  const abortControllerRef = useRef<AbortController>(null);

  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const maxTokens = useAIChatStore((state) => state.maxTokens);
  const temperature = useAIChatStore((state) => state.temperature);

  const addToChat = useAIChatStore((state) => state.addToChat);
  const streamToChat = useAIChatStore((state) => state.streamToChat);
  const stopStreamToChat = useAIChatStore((state) => state.stopStreamToChat);

  const processSSE = async (
    decoder: TextDecoder,
    reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>
  ) => {
    let chunk = ""; // Buffer for partial SSE messages

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        setIsLoading(false);
        break;
      }

      // Decode and process the chunk
      chunk += decoder.decode(value, { stream: true });

      // Process complete SSE messages in the buffer
      // SSE messages are separated by double newlines "\n\n"
      let boundary = chunk.indexOf("\n\n");
      while (boundary !== -1) {
        const message = chunk.substring(0, boundary); // Get one complete message block
        chunk = chunk.substring(boundary + 2); // Remove message block from buffer

        // Find the start of the JSON data after "data: "
        const dataPrefix = "data: ";
        if (message.startsWith(dataPrefix)) {
          const jsonString = message.substring(dataPrefix.length).trim();

          // Handle the special [DONE] message if the API sends it
          if (jsonString === "[DONE]") {
            // addToChat({ role: "assistant", content: currentStreamedResponseRef.current });
            stopStreamToChat();

            // No more data expected after this in standard SSE patterns
            // The reader.read() loop will terminate eventually anyway
            continue; // Skip to next message or loop iteration
          }

          try {
            const parsed = JSON.parse(jsonString);
            if (parsed.response) {
              // console.log("Parsed chunk:", parsed.response); // Debugging: See the text chunk
              // currentStreamedResponseRef.current += parsed.response;
              // setStreamData((prev) => prev + parsed.response); // Append *only* the text response
              streamToChat({ content: parsed.response, isGenerating: true });
            } else {
              // Handle cases where JSON is valid but doesn't have 'response'
            }
          } catch (parseError) {
            // Handle JSON parsing errors - maybe log them, maybe show an error
          }
        } else if (message.trim()) {
          // Optional: Handle other SSE lines like comments (starting with ':') or event types ('event: ...') if needed
          // console.log("Received non-data SSE line:", message);
        }

        // Check for the next message boundary in the updated buffer
        boundary = chunk.indexOf("\n\n");
      }
    }
  };

  const trigger = async ({ model, source, messages }: Args) => {
    // Reset state
    // setStreamData("");
    // currentStreamedResponseRef.current = "";
    setError("");
    setIsLoading(true);

    // Create a new abort controller
    abortControllerRef.current = new AbortController();

    try {
      // ------------------------------------------------------
      // Handle Cloudflare AI Worker
      // ------------------------------------------------------

      if (source === "cf") {
        if (temperature > 5 || maxTokens > 4096) {
          toast.show({
            title: "Something went wrong",
            message: "Invalid params",
            color: "yellow",
          });
          return;
        }

        const res = await fetch(workerDomain, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "",
            model: model,
            messages: messages,
            max_tokens: maxTokens,
            temperature: temperature,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!res.body) {
          return "";
        }

        const reader = res?.body?.getReader();
        const decoder = new TextDecoder();

        await processSSE(decoder, reader);

        // Reset state
        // setStreamData("");
        // currentStreamedResponseRef.current = "";
        // setError("");
        // setIsLoading(false);
        // abortControllerRef.current = null;
      }

      // ------------------------------------------------------
      // Handle Google AI
      // ------------------------------------------------------
      if (source === "google") {
        // return fetchData(`${apiDomain}/ai/chat`, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     model,
        //     prompt,
        //   }),
        // }) as Promise<IAPIResponse<any>>;
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err?.message || "An error occurred while streaming");
        console.error("Streaming error:", err);
      }
      setIsLoading(false);
    }

    return "";
  };

  const reset = () => {
    // Reset state
    stopStreamToChat();
    setError("");
    setIsLoading(false);
    abortControllerRef.current = null;
  };

  const stopStreaming = () => {
    stopStreamToChat();

    if (abortControllerRef.current) {
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;

      setIsLoading(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    isLoading,
    error,
    trigger,
    reset,
    stopStreaming,
  };
};

export default useAIChatAPI;
