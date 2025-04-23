export interface IAIChatMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  isGenerating: boolean;
}
