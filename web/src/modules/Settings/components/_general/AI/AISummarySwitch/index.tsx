import { Flex, Select, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AISummarySwitch = () => {
  //   const t = useTranslate();

  const useAISummary = useSettingsStore((state) => state.useAISummary);
  const setUseAISummary = useSettingsStore((state) => state.setUseAISummary);
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

      {useAISummary && (
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

      <Switch checked={useAISummary} onChange={(e) => setUseAISummary(e.currentTarget.checked)} />
    </Flex>
  );
};

export default AISummarySwitch;
