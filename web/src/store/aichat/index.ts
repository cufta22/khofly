import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IAIChatMessage } from "@ts/chat.types";

export type IAIProvider = "" | "cf" | "google";

interface IAIConfig {
  hasGeminiKey: boolean;
}

interface AIChatState {
  hydrated: boolean;

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
  systemInstruction: string;
  setSystemInstruction: (next: string) => void;

  config: IAIConfig;
  setConfig: (next: IAIConfig) => void;

  chat: IAIChatMessage[];
  setChat: (next: IAIChatMessage[]) => void;
  addToChat: (next: IAIChatMessage[]) => void;
  clearChat: () => void;
  streamToChat: (next: { content: string; isGenerating: boolean }) => void;
  stopStreamToChat: () => void;
}

export const useAIChatStore = create<AIChatState>()(
  persist(
    (set, get) => ({
      hydrated: false,

      provider: "",
      setProvider: (next) => set({ provider: next }),
      model: {
        label: "",
        value: "",
      },
      setModel: (next) => set({ model: next }),

      maxTokens: 2048,
      setMaxTokens: (next) => set({ maxTokens: next }),
      temperature: 0.5,
      setTemperature: (next) => set({ temperature: next }),
      systemInstruction: "",
      setSystemInstruction: (next) => set({ systemInstruction: next }),

      config: {
        hasGeminiKey: false,
      },
      setConfig: (next) => set({ config: next }),

      chat: [],
      setChat: (next) => set({ chat: next }),
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
          chat: current.chat.map((msg) =>
            msg.isGenerating ? { ...msg, isGenerating: false } : msg
          ),
        });
      },
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      name: "aichat-store", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => cookieStorage), // Test for SSR
      partialize: (state) => ({
        provider: state.provider,
        model: state.model,
      }),
    }
  )
);
