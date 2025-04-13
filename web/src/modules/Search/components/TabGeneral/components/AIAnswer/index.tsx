import { Button, Flex, Paper, Skeleton, Text, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";

import classes from "./styles.module.scss";
import { IconExternalLink, IconSparkles } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import useAIAnswerSWR from "src/api/ai/use-ai-answer-query";
import { useInstanceStore } from "@store/instance";
import useSearchQuery from "@hooks/use-search-query";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { useNavigate, useSearchParams } from "react-router";
import { useSettingsStore } from "@store/settings";
import { useAIChatStore } from "@store/aichat";

interface Props {
  propsQuery?: string;
}

const AIAnswer: React.FC<Props> = ({ propsQuery }) => {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const q = useSearchQuery();
  const queryToUse = propsQuery || q || "";

  const { data, isLoading, mutate } = useAIAnswerSWR({ prompt: queryToUse });

  const hydrated = useInstanceStore((state) => state.hydrated);
  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const useAIAnswers = useSettingsStore((state) => state.useAIAnswers);

  const setChat = useAIChatStore((state) => state.setChat);

  const linkTextColor = usePrimaryColor(4);

  const shouldTrigger = searchParams.get("ai") === "1";

  const handleOpenInChat = () => {
    // Init conversation
    setChat([
      { role: "user", content: queryToUse, isGenerating: false },
      { role: "assistant", content: data?.response || "", isGenerating: false },
    ]);

    navigate("/chat");
  };

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

      {data?.response && (
        <Flex justify="space-between" mt="lg">
          <Button
            size="xs"
            variant="light"
            color="pink.4"
            leftSection={<IconExternalLink style={getIconStyle(16)} />}
            onClick={handleOpenInChat}
          >
            Chat
          </Button>

          <Text size="sm">
            Answer provided by AI,{" "}
            <RemixLink to="/docs/ai-answers">
              <Text c={linkTextColor} component="span">
                learn more
              </Text>
            </RemixLink>
          </Text>
        </Flex>
      )}
    </Paper>
  );
};

export default AIAnswer;
