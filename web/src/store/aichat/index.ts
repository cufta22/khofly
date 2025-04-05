import { create } from "zustand";
import type { IAIChatMessage } from "@ts/chat.types";

interface IAIConfig {
  hasGeminiKey: boolean;
}

interface AIChatState {
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
  addToChat: (next: IAIChatMessage) => void;
  clearChat: () => void;
}

export const useAIChatStore = create<AIChatState>()((set, get) => ({
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

    set({ chat: [...current.chat, next] });
  },
  clearChat: () => set({ chat: [] }),
}));
