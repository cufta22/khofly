import { Divider, Paper, Stack, Tooltip, useMantineTheme } from "@mantine/core";

import { IconFlaskFilled, IconMessage, IconSparkles, IconTextScan2 } from "@tabler/icons-react";
import AIAnswerSwitch from "./AIAnswerSwitch";
import SettingsRow from "../../common/SettingsRow";
import SettingsTitle from "../../common/SettingsTitle";
import AIChatSwitch from "./AIChatSwitch";
import AISummarySwitch from "./AISummarySwitch";

const SettingsAI = () => {
  const theme = useMantineTheme();

  return (
    <Paper radius="md" withBorder>
      <SettingsTitle icon={<IconSparkles />} title="pages.settings.ai.title" />

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <SettingsRow
          icon={<IconSparkles color={theme.colors.pink["5"]} />}
          desc="pages.settings.ai.toggle_ai_answers"
          control={<AIAnswerSwitch />}
        />

        <Divider my="xs" w="100%" />

        <SettingsRow
          icon={<IconMessage color={theme.colors.pink["5"]} />}
          desc="pages.settings.ai.toggle_ai_chat"
          tooltip={
            <Tooltip label="Experimental">
              <IconFlaskFilled color={theme.colors.cyan["5"]} />
            </Tooltip>
          }
          control={<AIChatSwitch />}
        />

        <Divider my="xs" w="100%" />

        <SettingsRow
          icon={<IconTextScan2 color={theme.colors.pink["5"]} />}
          desc="pages.settings.ai.toggle_ai_summary"
          control={<AISummarySwitch />}
        />
      </Stack>
    </Paper>
  );
};

export default SettingsAI;
