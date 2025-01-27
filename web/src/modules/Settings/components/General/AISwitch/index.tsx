import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const AISwitch = () => {
  const t = useTranslate();

  const useAIAnswers = useSettingsStore((state) => state.useAIAnswers);
  const setUseAIAnswers = useSettingsStore((state) => state.setUseAIAnswers);

  return (
    <Flex align="center" gap="sm">
      <Text component="span" c="blue.4">
        <RemixLink to="/docs/ai-answers" target="_blank">
          {t("pages.settings.general.learn_more")}
        </RemixLink>
      </Text>

      <Switch checked={useAIAnswers} onChange={(e) => setUseAIAnswers(e.currentTarget.checked)} />
    </Flex>
  );
};

export default AISwitch;
