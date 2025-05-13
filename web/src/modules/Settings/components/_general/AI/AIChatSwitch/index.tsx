import { Flex, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AIChatSwitch = () => {
  //   const t = useTranslate();

  const useAIChat = useSettingsStore((state) => state.useAIChat);
  const setUseAIChat = useSettingsStore((state) => state.setUseAIChat);

  //   const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {/* <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink> */}

      <Switch checked={useAIChat} onChange={(e) => setUseAIChat(e.currentTarget.checked)} />
    </Flex>
  );
};

export default AIChatSwitch;
