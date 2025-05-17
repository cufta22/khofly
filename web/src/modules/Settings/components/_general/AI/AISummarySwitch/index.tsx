import { Flex, Select, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AISummarySwitch = () => {
  //   const t = useTranslate();

  const enableAISummary = useSettingsStore((state) => state.enableAISummary);
  const setEnableAISummary = useSettingsStore((state) => state.setEnableAISummary);
  const aiSummaryLength = useSettingsStore((state) => state.aiSummaryLength);
  const setAISummaryLenght = useSettingsStore((state) => state.setAISummaryLenght);

  //   const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {/* <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink> */}

      {enableAISummary && (
        <Select
          allowDeselect={false}
          data={[
            {
              label: "Short",
              value: "short",
            },
            {
              label: "Long",
              value: "long",
            },
          ]}
          value={aiSummaryLength}
          onChange={(val) => setAISummaryLenght(val as "short" | "long")}
          w={150}
        />
      )}

      <Switch
        checked={enableAISummary}
        onChange={(e) => setEnableAISummary(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default AISummarySwitch;
