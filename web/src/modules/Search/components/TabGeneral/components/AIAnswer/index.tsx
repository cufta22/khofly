import { Flex, Paper, Skeleton, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";

import classes from "./styles.module.scss";
import { IconSparkles } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import useAISWR from "src/api/ai/use-ai-query";
import { useInstanceStore } from "@store/instance";
import useSearchQuery from "@hooks/use-search-query";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { useSearchParams } from "react-router";
import { useSettingsStore } from "@store/settings";

interface Props {
  propsQuery?: string;
}

const AIAnswer: React.FC<Props> = ({ propsQuery }) => {
  const theme = useMantineTheme();

  const [searchParams] = useSearchParams();

  const q = useSearchQuery();
  const queryToUse = propsQuery || q || "";

  const { data, isLoading, mutate } = useAISWR({ prompt: queryToUse });

  const hydrated = useInstanceStore((state) => state.hydrated);
  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const useAIAnswers = useSettingsStore((state) => state.useAIAnswers);

  const linkTextColor = usePrimaryColor(4);

  const shouldTrigger = searchParams.get("ai") === "1";

  useEffect(() => {
    if (!hydrated || !useAIAnswers || !workerDomain || !queryToUse) return;

    if (!isLoading && shouldTrigger) {
      mutate();
    }
  }, [hydrated, queryToUse]);

  if (!shouldTrigger || !useAIAnswers) return null;

  return (
    <Paper className={classes.ai_answer} withBorder radius="md" p="md">
      {/* <Image src={img_src} radius="md" fit="contain" /> */}

      <Flex align="center" mb="sm">
        <IconSparkles style={getIconStyle(32)} color={theme.colors.pink["5"]} />

        <Text className={classes.ai_title} ml="sm" size="lg">
          {queryToUse}
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

      <Text size="sm" mt="lg" ta="right">
        Answer provided by AI,{" "}
        <RemixLink to="/docs/ai-answers">
          <Text c={linkTextColor} component="span">
            learn more
          </Text>
        </RemixLink>
      </Text>
    </Paper>
  );
};

export default AIAnswer;
