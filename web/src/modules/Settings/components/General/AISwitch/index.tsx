import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const AISwitch = () => {
  const t = useTranslate();

  const useAIAnswers = useSettingsStore((state) => state.useAIAnswers);
  const setUseAIAnswers = useSettingsStore((state) => state.setUseAIAnswers);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex align="center" gap="sm">
      <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink>

      <Switch checked={useAIAnswers} onChange={(e) => setUseAIAnswers(e.currentTarget.checked)} />
    </Flex>
  );
};

export default AISwitch;
