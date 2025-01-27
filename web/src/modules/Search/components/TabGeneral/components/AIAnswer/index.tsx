import { Flex, Paper, Skeleton, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";

import classes from "./styles.module.scss";
import { IconSparkles } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import useSearchQuery from "@hooks/use-search-query";
import useAISWR from "src/api/ai/use-ai-query";
import { useInstanceStore } from "@store/instance";

export const shouldDisplayAIAnswer = (query: string, keywords: string[]) => {
  let shouldDisplay = false;

  keywords.map((val) => {
    if (query?.toLowerCase().startsWith(val)) shouldDisplay = true;
  });

  return shouldDisplay;
};

const AIAnswer: React.FC = () => {
  const { data, isLoading, mutate } = useAISWR();
  const theme = useMantineTheme();

  const q = useSearchQuery();

  const hydrated = useInstanceStore((state) => state.hydrated);
  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const shouldTrigger = shouldDisplayAIAnswer(q, ["what", "who", "when", "why", "where", "how"]);

  useEffect(() => {
    if (!workerDomain || !q) return;

    if (!data && !isLoading && shouldTrigger) {
      mutate();
    }
  }, [hydrated, q]);

  if (!shouldTrigger) return null;

  return (
    <Paper className={classes.ai_answer} ml={80} withBorder radius="md" p="md">
      {/* <Image src={img_src} radius="md" fit="contain" /> */}

      <Flex align="center" mb="sm">
        <IconSparkles style={getIconStyle(32)} color={theme.colors.pink["5"]} />

        <Text className={classes.ai_title} ml="sm" size="lg">
          {q}
        </Text>
      </Flex>

      {data && !isLoading ? (
        <Text className={classes.ai_text} size="sm" c="dimmed">
          {data?.response}
        </Text>
      ) : (
        <Flex direction="column" gap="xs">
          <Skeleton h={10} />
          <Skeleton h={10} />
          <Skeleton h={10} />
          <Skeleton h={10} w="50%" />
        </Flex>
      )}
    </Paper>
  );
};

export default AIAnswer;
