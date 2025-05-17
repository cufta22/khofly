import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const IASwitch = () => {
  const t = useTranslate();

  const enableInstantAnswers = useSettingsStore((state) => state.enableInstantAnswers);
  const setEnableInstantAnswers = useSettingsStore((state) => state.setEnableInstantAnswers);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      <RemixLink to="/docs/instant-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink>

      <Switch
        checked={enableInstantAnswers}
        onChange={(e) => setEnableInstantAnswers(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default IASwitch;
