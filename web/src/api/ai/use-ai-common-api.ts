import { useInstanceStore } from "@store/instance";
import useToast from "@hooks/use-toast";

import { useEffect, useRef, useState } from "react";
import { processSSE } from "./utils";
import { IAIChatMessage } from "@ts/chat.types";

interface TriggerArgs {
  source: "cf" | "google";
  model: string;
  messages: IAIChatMessage[];
}
interface Args {
  variant: "ai-answer" | "ai-chat" | "ai-summary";
  temperature: number;
  maxTokens: number;
  systemInstruction: string;
  handleUpdateStream: (val: string) => void;
  handleDONE: () => void;
}

// Not an swr this time
const useAICommonAPI = ({
  variant,
  maxTokens,
  temperature,
  systemInstruction,
  handleDONE,
  handleUpdateStream,
}: Args) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Ref to keep track of the response being streamed
  const abortControllerRef = useRef<AbortController>(null);

  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const trigger = async ({ model, source, messages }: TriggerArgs) => {
    setError("");
    setIsLoading(true);

    // Create a new abort controller
    abortControllerRef.current = new AbortController();

    try {
      // ------------------------------------------------------
      // Handle Cloudflare AI Worker
      // ------------------------------------------------------
      if (source === "cf") {
        // Check CF config
        if (temperature > 5 || maxTokens > 4096) {
          toast.show({
            title: "Something went wrong",
            message: "Invalid params",
            color: "yellow",
          });
          return;
        }

        const workerRes = await fetch(workerDomain, {
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

        if (!workerRes.body) {
          return "";
        }

        const reader = workerRes?.body?.getReader();
        const decoder = new TextDecoder();

        await processSSE({
          decoder,
          reader,
          setIsLoading,
          handleUpdateStream,
          handleDONE,
        });
      }

      // ------------------------------------------------------
      // Handle Google AI
      // ------------------------------------------------------
      if (source === "google") {
        // Check Google config
        if (temperature > 2 || maxTokens > 4096) {
          toast.show({
            title: "Something went wrong",
            message: "Invalid params",
            color: "yellow",
          });
          return;
        }

        const googleRes = await fetch(`${apiDomain}/ai/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            messages: messages.filter((msg) => msg.content),
            max_tokens: maxTokens,
            temperature: temperature,
            system_instruction: systemInstruction,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!googleRes.body) {
          return "";
        }

        const reader = googleRes?.body?.getReader();
        const decoder = new TextDecoder();

        await processSSE({
          decoder,
          reader,
          setIsLoading,
          handleUpdateStream,
          handleDONE,
        });
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err?.message || "An error occurred while streaming");
      }
      setIsLoading(false);

      const errMsg = {
        cf: "Cloudflare Worker API Error",
        google: "Gemini API Error",
      }[source];

      toast.show({ title: errMsg, message: err?.message, color: "red" });
    }

    return "";
  };

  const reset = () => {
    // Reset state
    handleDONE();
    setError("");
    setIsLoading(false);
    abortControllerRef.current = null;
  };

  const stopStreaming = () => {
    handleDONE();

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

export default useAICommonAPI;
