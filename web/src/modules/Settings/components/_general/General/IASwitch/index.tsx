import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const IASwitch = () => {
  const t = useTranslate();

  const useInstantAnswers = useSettingsStore((state) => state.useInstantAnswers);
  const setUseInstantAnswers = useSettingsStore((state) => state.setUseInstantAnswers);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex align="center" gap="sm">
      <RemixLink to="/docs/instant-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink>

      <Switch
        checked={useInstantAnswers}
        onChange={(e) => setUseInstantAnswers(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default IASwitch;
