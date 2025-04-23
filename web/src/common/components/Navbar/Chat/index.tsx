import { getAIChatModels, getAIChatProviders } from "@module/Chat/data";
import classes from "./styles.module.scss";
import {
  Button,
  Divider,
  Flex,
  Group,
  Image,
  NumberInput,
  Select,
  Textarea,
  useMantineTheme,
  type SelectProps,
} from "@mantine/core";
import { useInstanceStore } from "@store/instance";
import { type IAIProvider, useAIChatStore } from "@store/aichat";
import { IconCurrencyDollar, IconTrash } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useEffect } from "react";
import { getAIChatModelSource } from "@module/Chat/utils";

const ChatNavbar = () => {
  const theme = useMantineTheme();
  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const hydrated = useAIChatStore((state) => state.hydrated);

  const provider = useAIChatStore((state) => state.provider);
  const setProvider = useAIChatStore((state) => state.setProvider);
  const model = useAIChatStore((state) => state.model);
  const setModel = useAIChatStore((state) => state.setModel);

  const config = useAIChatStore((state) => state.config);

  const clearChat = useAIChatStore((state) => state.clearChat);

  const maxTokens = useAIChatStore((state) => state.maxTokens);
  const setMaxTokens = useAIChatStore((state) => state.setMaxTokens);
  const temperature = useAIChatStore((state) => state.temperature);
  const setTemperature = useAIChatStore((state) => state.setTemperature);
  const systemInstruction = useAIChatStore((state) => state.systemInstruction);
  const setSystemInstruction = useAIChatStore((state) => state.setSystemInstruction);

  const aiSource = getAIChatModelSource(model.value);
  const providerData = getAIChatProviders({
    cfWorkerURL: workerDomain,
    hasGeminiKey: config.hasGeminiKey,
  });
  const modelData = getAIChatModels(provider);

  const getIconProvider = (value: string) => {
    if (value.includes("cf")) {
      return <Image src="/assets/engines/cloudflare-icon.svg" w={16} h={16} />;
    }
    if (value.includes("google")) {
      return <Image src="/assets/engines/google-icon.svg" w={16} h={16} />;
    }
  };

  const getIconModel = (value: string) => {
    if (value.includes("llama-") || value.includes("m2m100")) {
      return <Image src="/assets/engines/meta-icon.svg" fit="contain" w={16} h={16} />;
    }
    if (value.includes("gemma-")) {
      return <Image src="/assets/engines/google-icon.svg" w={16} h={16} />;
    }
    if (value.includes("mistral-")) {
      return <Image src="/assets/engines/mistral-icon.svg" w={16} h={16} />;
    }
    if (value.includes("deepseek")) {
      return <Image src="/assets/engines/deepseek-icon.svg" w={16} h={16} />;
    }
    if (value.includes("qwen")) {
      return <Image src="/assets/engines/qwen-icon.svg" w={16} h={16} />;
    }
    if (value.includes("gemini")) {
      return <Image src="/assets/engines/gemini-icon.svg" w={16} h={16} />;
    }
    if (value.includes("imagen")) {
      return <Image src="/assets/engines/deepmind-icon.svg" w={16} h={16} />;
    }
  };

  const renderSelectOptionProvider: SelectProps["renderOption"] = ({ option }) => (
    <Group flex="1" gap="xs">
      {getIconProvider(option.value)}
      {option.label}
    </Group>
  );
  const renderSelectOptionModel: SelectProps["renderOption"] = ({ option }) => (
    <Group flex="1" gap="xs">
      {getIconModel(option.value)}
      {option.label}

      {option.value.includes("imagen") && (
        <>
          <div style={{ flex: 1 }} />
          <IconCurrencyDollar style={getIconStyle(20)} color={theme.colors.green[6]} />
        </>
      )}
    </Group>
  );

  // Select model if not selected
  useEffect(() => {
    if (!hydrated) return;
    if (provider) return;

    if (workerDomain.length && modelData) {
      setProvider("cf");
      setModel({
        label: "Llama 3.1 8b ( instruct, fast )",
        value: "@cf/meta/llama-3.1-8b-instruct-fast",
      });
    } else if (config.hasGeminiKey) {
      setProvider("google");
      setModel({
        label: "Gemini 2.0 Flash",
        value: "gemini-2.0-flash",
      });
    }
  }, [config, hydrated]);

  return (
    <Flex className={classes.navbar} direction="column">
      <Select
        label="Select provider"
        renderOption={renderSelectOptionProvider}
        leftSection={getIconProvider(provider)}
        data={providerData}
        value={provider}
        onChange={(val) => {
          if (val) {
            clearChat();
            setProvider(val as IAIProvider);

            // Reset params
            setTemperature(0.5);
            setMaxTokens(2048);

            if (val === "cf") {
              setModel({
                label: "Llama 3.1 8b ( instruct, fast )",
                value: "@cf/meta/llama-3.1-8b-instruct-fast",
              });
            }
            if (val === "google") {
              setModel({
                label: "Gemini 2.0 Flash",
                value: "gemini-2.0-flash",
              });
            }
          }
        }}
      />
      <Select
        label="Model"
        renderOption={renderSelectOptionModel}
        leftSection={getIconModel(model.value)}
        mt="sm"
        data={modelData}
        value={model.value}
        onChange={(val) => {
          if (val && modelData) {
            let found = undefined;

            for (const group of modelData) {
              const foundItem = group.items.find((item) => item.value === val);
              if (foundItem) {
                found = foundItem;
              }
            }

            if (found) {
              clearChat();
              setModel({
                label: found.label,
                value: found.value,
              });
            }
          }
        }}
      />

      {["cf", "google"].includes(aiSource) && <Divider mt="lg" />}

      {["cf", "google"].includes(aiSource) && (
        <NumberInput
          mt="md"
          label="max_tokens"
          value={maxTokens}
          onChange={(val) => setMaxTokens(typeof val === "string" ? Number.parseInt(val) : val)}
          min={256}
          max={4096}
          step={256}
        />
      )}

      {["cf", "google"].includes(aiSource) && (
        <NumberInput
          mt="lg"
          label="temperature"
          value={temperature}
          onChange={(val) => setTemperature(typeof val === "string" ? Number.parseInt(val) : val)}
          min={0.1}
          max={
            {
              cf: 5,
              google: 2,
            }[aiSource]
          }
          step={0.1}
        />
      )}

      {["google"].includes(aiSource) && (
        <Textarea
          mt="lg"
          label="system_instruction"
          value={systemInstruction}
          onChange={(e) => setSystemInstruction(e.currentTarget.value)}
        />
      )}

      <Button
        mt="lg"
        variant="light"
        leftSection={<IconTrash style={getIconStyle(22)} />}
        color="red"
        onClick={clearChat}
      >
        Clear chat
      </Button>
    </Flex>
  );
};

export default ChatNavbar;
