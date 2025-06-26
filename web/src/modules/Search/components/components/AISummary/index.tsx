import { Center, Drawer, Flex, Loader, ScrollArea, Text } from "@mantine/core";
import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import ReactMarkdown from "react-markdown";
import { useSearchStore } from "@store/search";
import { useEffect, useState } from "react";
import useAICommonAPI from "src/api/ai/use-ai-common-api";
import { useSettingsStore } from "@store/settings";

const AISummary = () => {
  const [data, setData] = useState("");

  const { trigger, isLoading, reset } = useAICommonAPI({
    variant: "ai-answer",
    temperature: 0.4,
    maxTokens: 2048,
    systemInstruction: "",
    handleUpdateStream: (val) => setData(val),
    handleDONE: () => {},
  });

  const AISummary = useSettingsStore((state) => state.AISummary);
  const aiSummaryURL = useSearchStore((state) => state.aiSummaryURL);
  const setAISummaryURL = useSearchStore((state) => state.setAISummaryURL);

  const t = useTranslate();

  useEffect(() => {
    if (!isLoading && aiSummaryURL.length) {
      const msgContent = {
        short: `Can you give me a summary of this website: ${aiSummaryURL}`,
        long: `Can you give me an in depth summary of this website: ${aiSummaryURL}`,
      }[AISummary.length];

      trigger({
        messages: [
          {
            role: "user",
            content: msgContent,
            isGenerating: false,
          },
        ],
        model: "gemini-2.0-flash",
        source: "google",
      });
    }
  }, [aiSummaryURL]);

  return (
    <Drawer
      offset={8}
      size="lg"
      radius="md"
      opened={!!aiSummaryURL}
      onClose={() => {
        reset();
        setAISummaryURL("");
      }}
      title={
        <Flex align="center" gap="sm">
          <Text size="xl">AI Summary</Text>
        </Flex>
      }
      position="right"
      padding="xl"
      closeButtonProps={{
        size: "lg",
      }}
      classNames={{
        header: classes.drawer_header,
        content: classes.drawer_root,
      }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {isLoading ? (
        <Center mt="xl" pt="xl">
          <Loader size="xl" />
        </Center>
      ) : (
        <ReactMarkdown>{data}</ReactMarkdown>
      )}
    </Drawer>
  );
};

export default AISummary;
