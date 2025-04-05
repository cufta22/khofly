import { getAIChatModels } from "@module/Chat/data";
import classes from "./styles.module.scss";
import { Button, Flex, Group, Image, NumberInput, Select, type SelectProps } from "@mantine/core";
import { useInstanceStore } from "@store/instance";
import { useAIChatStore } from "@store/aichat";
import { IconTrash } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useEffect } from "react";
import { getAIChatModelSource } from "@module/Chat/utils";

const ChatNavbar = () => {
  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const model = useAIChatStore((state) => state.model);
  const setModel = useAIChatStore((state) => state.setModel);

  const config = useAIChatStore((state) => state.config);

  const clearChat = useAIChatStore((state) => state.clearChat);

  const maxTokens = useAIChatStore((state) => state.maxTokens);
  const setMaxTokens = useAIChatStore((state) => state.setMaxTokens);

  const temperature = useAIChatStore((state) => state.temperature);
  const setTemperature = useAIChatStore((state) => state.setTemperature);

  const data = getAIChatModels({ cfWorkerURL: workerDomain, hasGeminiKey: config.hasGeminiKey });

  const getIcon = (value: string) => {
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
  };

  const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
    <Group flex="1" gap="xs">
      {getIcon(option.value)}
      {option.label}
    </Group>
  );

  const aiSource = getAIChatModelSource(model.value);

  // Select model if not selected
  useEffect(() => {
    if (workerDomain.length) {
      const workerModel = data.find((item) => item.group === "Cloudflare Worker")?.items[0];

      if (workerModel) setModel({ label: workerModel.label, value: workerModel.value });
    } else if (config.hasGeminiKey) {
      const googleModel = data.find((item) => item.group === "Google AI")?.items[0];

      if (googleModel) setModel({ label: googleModel.label, value: googleModel.value });
    }
  }, [config]);

  return (
    <Flex className={classes.navbar} direction="column">
      <Select
        label="Select model"
        renderOption={renderSelectOption}
        leftSection={getIcon(model.value)}
        data={data}
        value={model.value}
        onChange={(val) => {
          if (val) {
            let found = undefined;

            for (const group of data) {
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

      {aiSource === "cf" && (
        <NumberInput
          mt="lg"
          label="max_tokens"
          value={maxTokens}
          onChange={(val) => setMaxTokens(typeof val === "string" ? Number.parseInt(val) : val)}
          min={256}
          max={4096}
          step={256}
        />
      )}

      {aiSource === "cf" && (
        <NumberInput
          mt="lg"
          label="temperature"
          value={temperature}
          onChange={(val) => setTemperature(typeof val === "string" ? Number.parseInt(val) : val)}
          min={0.1}
          max={5}
          step={0.1}
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
