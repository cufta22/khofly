import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AIAnswerSwitch = () => {
  const t = useTranslate();

  const AIAnswer = useSettingsStore((state) => state.AIAnswer);
  const setAIAnswer = useSettingsStore((state) => state.setAIAnswer);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink>

      <Switch
        checked={AIAnswer.enabled}
        onChange={(e) => setAIAnswer({ enabled: e.currentTarget.checked })}
      />
    </Flex>
  );
};

export default AIAnswerSwitch;
