import { Flex, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AIChatSwitch = () => {
  //   const t = useTranslate();

  const enableAIChat = useSettingsStore((state) => state.enableAIChat);
  const setEnableAIChat = useSettingsStore((state) => state.setEnableAIChat);

  //   const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {/* <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink> */}

      <Switch checked={enableAIChat} onChange={(e) => setEnableAIChat(e.currentTarget.checked)} />
    </Flex>
  );
};

export default AIChatSwitch;
