interface Args {
  cfWorkerURL: string;
  hasGeminiKey: boolean;
}

export const getAIChatModels = ({ cfWorkerURL, hasGeminiKey }: Args) => {
  const models = [
    {
      group: "Cloudflare Worker",
      items: [
        {
          label: "Llama 3.1 8b",
          value: "@cf/meta/llama-3.1-8b-instruct-fast",
          disabled: !cfWorkerURL.length,
        },
        {
          label: "Llama 3.2 3b",
          value: "@cf/meta/llama-3.2-3b-instruct",
          disabled: !cfWorkerURL.length,
        },
        {
          label: "Llama 3.3 70b",
          value: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
          disabled: !cfWorkerURL.length,
        },

        {
          label: "DeepSeek r1 ( qwen distill )",
          value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
          disabled: !cfWorkerURL.length,
        },

        {
          label: "Gemma 7b",
          value: "@cf/google/gemma-7b-it-lora",
          disabled: !cfWorkerURL.length,
        },

        {
          label: "Qwen 1.5 1.8b",
          value: "@cf/qwen/qwen1.5-1.8b-chat",
          disabled: !cfWorkerURL.length,
        },
        {
          label: "Qwen 1.5 7b",
          value: "@cf/qwen/qwen1.5-7b-chat-awq",
          disabled: !cfWorkerURL.length,
        },
        {
          label: "Qwen 1.5 14b",
          value: "@cf/qwen/qwen1.5-14b-chat-awq",
          disabled: !cfWorkerURL.length,
        },
      ],
    },
    {
      group: "Google AI",
      items: [
        {
          label: "Gemini 2.0 Flash",
          value: "gemini-2.0-flash",
          disabled: !hasGeminiKey,
        },
      ],
    },
  ];

  return models;
};
