import { useInstanceStore } from "@store/instance";
import useToast from "@hooks/use-toast";

import { useEffect, useRef, useState } from "react";
import { useSettingsStore } from "@store/settings";

// Not an swr this time
const useAISummaryAPI = () => {
  const { toast } = useToast();

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Ref to keep track of the response being streamed
  const abortControllerRef = useRef<AbortController>(null);

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const aiSummaryLength = useSettingsStore((state) => state.aiSummaryLength);

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
            continue; // Skip to next message or loop iteration
          }

          try {
            const parsed = JSON.parse(jsonString);
            if (parsed?.response) {
              // Handle CF stream
              setData((prev) => `${prev} ${parsed?.response}`);
            } else if (parsed?.text) {
              // Handle Gemini stream
              setData((prev) => `${prev} ${parsed?.text}`);
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

  const trigger = async (url: string) => {
    setError("");
    setIsLoading(true);

    // Create a new abort controller
    abortControllerRef.current = new AbortController();

    const msgContent = {
      short: `Can you give me a summary of this website: ${url}`,
      long: `Can you give me an in depth summary of this website: ${url}`,
    }[aiSummaryLength];

    try {
      const googleRes = await fetch(`${apiDomain}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.0-flash",
          messages: [
            {
              role: "user",
              content: msgContent,
            },
          ],
          max_tokens: 2048,
          temperature: 0.4,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!googleRes.body) {
        return "";
      }

      const reader = googleRes?.body?.getReader();
      const decoder = new TextDecoder();

      await processSSE(decoder, reader);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err?.message || "An error occurred while streaming");
        console.error("Streaming error:", err);
      }
      setIsLoading(false);

      toast.show({ title: "Gemini API Error", message: err?.message, color: "red" });
    }

    return "";
  };

  const reset = () => {
    // Reset state
    setData("");
    setError("");

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
    data,
    isLoading,
    error,
    trigger,
    reset,
  };
};

export default useAISummaryAPI;
