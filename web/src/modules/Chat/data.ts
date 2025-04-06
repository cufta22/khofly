import type { IAIProvider } from "@store/aichat";

interface Args {
  cfWorkerURL: string;
  hasGeminiKey: boolean;
}

export const getAIChatProviders = ({ cfWorkerURL, hasGeminiKey }: Args) => {
  return [
    {
      label: "Cloudflare Workers",
      value: "cf",
      disabled: !cfWorkerURL.length,
    },
    {
      label: "Google AI",
      value: "google",
      disabled: !hasGeminiKey,
    },
  ];
};

export const getAIChatModels = (provider: IAIProvider) => {
  switch (provider) {
    case "cf":
      return [
        {
          group: "Meta",
          items: [
            {
              label: "Llama 2 7b - chat, fp16",
              value: "@cf/meta/llama-2-7b-chat-fp16",
            },
            {
              label: "Llama 2 7b - chat, int8",
              value: "@cf/meta/llama-2-7b-chat-int8",
            },

            {
              label: "Llama 3 8b - instruct",
              value: "@cf/meta/llama-3-8b-instruct",
            },
            {
              label: "Llama 3 8b - instruct, awq",
              value: "@cf/meta/llama-3-8b-instruct-awq",
            },

            {
              label: "Llama Guard 3 8b",
              value: "@cf/meta/llama-guard-3-8b",
            },

            {
              label: "Llama 3.1 8b - instruct",
              value: "@cf/meta/llama-3.1-8b-instruct",
            },
            {
              label: "Llama 3.1 8b - instruct, fast",
              value: "@cf/meta/llama-3.1-8b-instruct-fast",
            },
            {
              label: "Llama 3.1 8b - instruct, fp8",
              value: "@cf/meta/llama-3.1-8b-instruct-fp8",
            },
            {
              label: "Llama 3.1 8b - instruct, awq",
              value: "@cf/meta/llama-3.1-8b-instruct-awq",
            },
            {
              label: "Llama 3.1 70b - instruct",
              value: "@cf/meta/llama-3.1-70b-instruct",
            },

            {
              label: "Llama 3.2 1b - instruct",
              value: "@cf/meta/llama-3.2-1b-instruct",
            },
            {
              label: "Llama 3.2 3b - instruct",
              value: "@cf/meta/llama-3.2-3b-instruct",
            },

            {
              label: "Llama 3.3 70b - instruct, fp8, fast",
              value: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
            },

            {
              label: "Llama 4 Scout 17b - 16e, instruct",
              value: "@cf/meta/llama-4-scout-17b-16e-instruct",
            },

            //   {
            //     label: "m2m100-1.2b",
            //     value: "@cf/meta/m2m100-1.2b",
            //   },
          ],
        },

        {
          group: "Google",
          items: [
            {
              label: "Gemma 2b - it, lora",
              value: "@cf/google/gemma-2b-it-lora",
            },
            {
              label: "Gemma 7b - it, lora",
              value: "@cf/google/gemma-7b-it-lora",
            },
            {
              label: "Gemma 7b - it",
              value: "@hf/google/gemma-7b-it",
            },
          ],
        },

        {
          group: "MistralAI",
          items: [
            {
              label: "Mistral 7b - instruct v0.1",
              value: "@cf/mistral/mistral-7b-instruct-v0.1",
            },
            {
              label: "Mistral 7b - instruct v0.2",
              value: "@hf/mistral/mistral-7b-instruct-v0.2",
            },
            {
              label: "Mistral 7b - instruct v0.2, lora",
              value: "@cf/mistral/mistral-7b-instruct-v0.2-lora",
            },
          ],
        },

        {
          group: "DeepSeek",
          items: [
            {
              label: "DeepSeek R1 - distill qwen-32b",
              value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
            },
            {
              label: "DeepSeek Math 7b - instruct",
              value: "@cf/deepseek-ai/deepseek-math-7b-instruct",
            },
          ],
        },

        {
          group: "Qwen",
          items: [
            {
              label: "Qwen1.5 0.5b - chat",
              value: "@cf/qwen/qwen1.5-0.5b-chat",
            },
            {
              label: "Qwen1.5 1.8b - chat",
              value: "@cf/qwen/qwen1.5-1.8b-chat",
            },
            {
              label: "Qwen1.5 7b - chat, awq",
              value: "@cf/qwen/qwen1.5-7b-chat-awq",
            },
            {
              label: "Qwen1.5 14b - chat, awq",
              value: "@cf/qwen/qwen1.5-14b-chat-awq",
            },
          ],
        },
      ];

    case "google":
      return [
        {
          group: "Google AI",
          items: [
            {
              label: "Gemini 2.5 Pro Preview",
              value: "gemini-2.5-pro-preview-03-25",
            },
            {
              label: "Gemini 2.0 Flash",
              value: "gemini-2.0-flash",
            },
            {
              label: "Gemini 2.0 Flash-Lite",
              value: "gemini-2.0-flash-lite",
            },
          ],
        },
      ];

    default:
      return [];
  }
};
