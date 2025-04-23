import type { ComboboxLikeProps } from "@mantine/core";

export const WORKER_MODELS_DATA: ComboboxLikeProps["data"] = [
  {
    group: "Meta",
    items: [
      {
        label: "llama-2-7b-chat-fp16",
        value: "@cf/meta/llama-2-7b-chat-fp16",
      },
      {
        label: "llama-2-7b-chat-int8",
        value: "@cf/meta/llama-2-7b-chat-int8",
      },

      {
        label: "llama-3-8b-instruct",
        value: "@cf/meta/llama-3-8b-instruct",
      },
      {
        label: "llama-3-8b-instruct-awq",
        value: "@cf/meta/llama-3-8b-instruct-awq",
      },

      {
        label: "llama-3.1-8b-instruct",
        value: "@cf/meta/llama-3.1-8b-instruct",
      },
      {
        label: "llama-3.1-8b-instruct-fast",
        value: "@cf/meta/llama-3.1-8b-instruct-fast",
      },
      {
        label: "llama-3.1-8b-instruct-fp8",
        value: "@cf/meta/llama-3.1-8b-instruct-fp8",
      },
      {
        label: "llama-3.1-8b-instruct-awq",
        value: "@cf/meta/llama-3.1-8b-instruct-awq",
      },
      {
        label: "llama-3.1-70b-instruct",
        value: "@cf/meta/llama-3.1-70b-instruct",
      },

      {
        label: "llama-3.2-1b-instruct",
        value: "@cf/meta/llama-3.2-1b-instruct",
      },
      {
        label: "llama-3.2-3b-instruct",
        value: "@cf/meta/llama-3.2-3b-instruct",
      },

      {
        label: "llama-3.3-70b-instruct-fp8-fast",
        value: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
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
        label: "gemma-2b-it-lora",
        value: "@cf/google/gemma-2b-it-lora",
      },
      {
        label: "gemma-7b-it-lora",
        value: "@cf/google/gemma-7b-it-lora",
      },
      {
        label: "gemma-7b-it",
        value: "@hf/google/gemma-7b-it",
      },
    ],
  },

  {
    group: "MistralAI",
    items: [
      {
        label: "mistral-7b-instruct-v0.1",
        value: "@cf/mistral/mistral-7b-instruct-v0.1",
      },
      {
        label: "mistral-7b-instruct-v0.2",
        value: "@hf/mistral/mistral-7b-instruct-v0.2",
      },
      {
        label: "mistral-7b-instruct-v0.2-lora",
        value: "@cf/mistral/mistral-7b-instruct-v0.2-lora",
      },
    ],
  },

  {
    group: "DeepSeek",
    items: [
      {
        label: "deepseek-r1-distill-qwen-32b",
        value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      },
      {
        label: "deepseek-math-7b-instruct",
        value: "@cf/deepseek-ai/deepseek-math-7b-instruct",
      },
    ],
  },

  {
    group: "Qwen",
    items: [
      {
        label: "qwen1.5-0.5b-chat",
        value: "@cf/qwen/qwen1.5-0.5b-chat",
      },
      {
        label: "qwen1.5-1.8b-chat",
        value: "@cf/qwen/qwen1.5-1.8b-chat",
      },
      {
        label: "qwen1.5-7b-chat-awq",
        value: "@cf/qwen/qwen1.5-7b-chat-awq",
      },
      {
        label: "qwen1.5-14b-chat-awq",
        value: "@cf/qwen/qwen1.5-14b-chat-awq",
      },
    ],
  },
];
