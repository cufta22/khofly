import { Accordion, Divider, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { useTranslate } from "@hooks/translate/use-translate";
import classes from "../styles.module.scss";

import AIAnswerSwitch from "@module/Settings/components/_general/AI/AIAnswerSwitch";
import AISummarySwitch from "@module/Settings/components/_general/AI/AISummarySwitch";

const QSAI = () => {
  const theme = useMantineTheme();

  const t = useTranslate();

  return (
    <Accordion.Item className={classes.acc_item} value="ai">
      <Accordion.Control
        className={classes.acc_control}
        icon={<IconSparkles color={theme.colors.pink["5"]} />}
      >
        <Text size="lg">{t("pages.settings.ai.title")}</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack mt="lg">
          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.ai.toggle_ai_answers")}</Text>

            <AIAnswerSwitch />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.ai.toggle_ai_summary")}</Text>

            <AISummarySwitch />
          </Flex>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default QSAI;
