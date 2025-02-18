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

export const shouldDisplayAIAnswer = (query: string, keywords: string[]) => {
  let shouldDisplay = false;

  keywords.map((val) => {
    if (query?.toLowerCase().startsWith(val)) shouldDisplay = true;
  });

  return shouldDisplay;
};

interface Props {
  propsQuery?: string;
}

const AIAnswer: React.FC<Props> = ({ propsQuery }) => {
  const { data, isMutating, trigger } = useAISWR();
  const theme = useMantineTheme();

  const q = useSearchQuery();
  const queryToUse = propsQuery || q || "";

  const hydrated = useInstanceStore((state) => state.hydrated);
  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const linkTextColor = usePrimaryColor(4);

  const shouldTrigger = shouldDisplayAIAnswer(queryToUse, [
    "what",
    "who",
    "when",
    "why",
    "where",
    "how",
  ]);

  useEffect(() => {
    if (!workerDomain || !queryToUse) return;

    if (!data && !isMutating && shouldTrigger) {
      trigger(queryToUse);
    }
  }, [hydrated, queryToUse]);

  if (!shouldTrigger) return null;

  return (
    <Paper className={classes.ai_answer} ml={propsQuery ? 0 : 80} withBorder radius="md" p="md">
      {/* <Image src={img_src} radius="md" fit="contain" /> */}

      <Flex align="center" mb="sm">
        <IconSparkles style={getIconStyle(32)} color={theme.colors.pink["5"]} />

        <Text className={classes.ai_title} ml="sm" size="lg">
          {queryToUse}
        </Text>
      </Flex>

      {data && !isMutating ? (
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

      <Text size="sm" mt="xs" ta="right">
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
