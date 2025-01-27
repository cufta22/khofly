import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const IASwitch = () => {
  const t = useTranslate();

  const useInstantAnswers = useSettingsStore((state) => state.useInstantAnswers);
  const setUseInstantAnswers = useSettingsStore((state) => state.setUseInstantAnswers);

  return (
    <Flex align="center" gap="sm">
      <Text component="span" c="blue.4">
        <RemixLink to="/docs/instant-answers" target="_blank">
          {t("pages.settings.general.learn_more")}
        </RemixLink>
      </Text>

      <Switch checked={useInstantAnswers} onChange={(e) => setUseInstantAnswers(e.currentTarget.checked)} />
    </Flex>
  );
};

export default IASwitch;
