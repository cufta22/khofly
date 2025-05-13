import { Drawer, Flex, ScrollArea, Text } from "@mantine/core";
import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import ReactMarkdown from "react-markdown";
import { useSearchStore } from "@store/search";
import useAISummaryAPI from "src/api/ai/use-ai-summary-api";
import { useEffect } from "react";

const AISummary = () => {
  const { data, trigger, reset, isLoading } = useAISummaryAPI();

  const aiSummaryURL = useSearchStore((state) => state.aiSummaryURL);
  const setAISummaryURL = useSearchStore((state) => state.setAISummaryURL);

  const t = useTranslate();

  useEffect(() => {
    if (!isLoading && aiSummaryURL.length) {
      trigger(aiSummaryURL);
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
      <ReactMarkdown>{data}</ReactMarkdown>
    </Drawer>
  );
};

export default AISummary;
