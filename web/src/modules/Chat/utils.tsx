import { Image } from "@mantine/core";

export const getAIChatModelSource = (model: string) => {
  if (model.includes("@cf") || model.includes("@hf")) {
    return "cf";
  } else {
    return "google";
  }
};

export const getAIChatModelIcon = (value: string, size: number) => {
  if (value.includes("llama-") || value.includes("m2m100")) {
    return <Image src="/assets/engines/meta-icon.svg" fit="contain" w={size} h={size} />;
  }
  if (value.includes("gemma-")) {
    return <Image src="/assets/engines/google-icon.svg" w={size} h={size} />;
  }
  if (value.includes("mistral-")) {
    return <Image src="/assets/engines/mistral-icon.svg" w={size} h={size} />;
  }
  if (value.includes("deepseek")) {
    return <Image src="/assets/engines/deepseek-icon.svg" w={size} h={size} />;
  }
  if (value.includes("qwen")) {
    return <Image src="/assets/engines/qwen-icon.svg" w={size} h={size} />;
  }
  if (value.includes("gemini")) {
    return <Image src="/assets/engines/gemini-icon.svg" w={size} h={size} />;
  }
  if (value.includes("imagen")) {
    return <Image src="/assets/engines/deepmind-icon.svg" w={size} h={size} />;
  }
};
