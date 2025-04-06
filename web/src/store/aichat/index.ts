import { create } from "zustand";
import type { IAIChatMessage } from "@ts/chat.types";

export type IAIProvider = "" | "cf" | "google";

interface IAIConfig {
  hasGeminiKey: boolean;
}

interface AIChatState {
  provider: IAIProvider;
  setProvider: (next: IAIProvider) => void;
  model: {
    label: string;
    value: string;
  };
  setModel: (next: { label: string; value: string }) => void;

  maxTokens: number;
  setMaxTokens: (next: number) => void;

  temperature: number;
  setTemperature: (next: number) => void;

  config: IAIConfig;
  setConfig: (next: IAIConfig) => void;

  chat: IAIChatMessage[];
  addToChat: (next: IAIChatMessage[]) => void;
  clearChat: () => void;
  streamToChat: (next: { content: string; isGenerating: boolean }) => void;
  stopStreamToChat: () => void;
}

export const useAIChatStore = create<AIChatState>()((set, get) => ({
  provider: "",
  setProvider: (next) => set({ provider: next }),
  model: {
    label: "",
    value: "",
  },
  setModel: (next) => set({ model: next }),

  maxTokens: 2056,
  setMaxTokens: (next) => set({ maxTokens: next }),

  temperature: 0.5,
  setTemperature: (next) => set({ temperature: next }),

  config: {
    hasGeminiKey: false,
  },
  setConfig: (next) => set({ config: next }),

  chat: [],
  addToChat: (next) => {
    const current = get();

    set({ chat: [...current.chat, ...next] });
  },
  clearChat: () => set({ chat: [] }),
  streamToChat: (next) => {
    const current = get();

    set({
      chat: current.chat.map((msg) =>
        msg.isGenerating
          ? {
              role: msg.role,
              content: msg.content + next.content,
              isGenerating: next.isGenerating,
            }
          : msg
      ),
    });
  },
  stopStreamToChat: () => {
    const current = get();

    set({
      chat: current.chat.map((msg) => (msg.isGenerating ? { ...msg, isGenerating: false } : msg)),
    });
  },
}));
