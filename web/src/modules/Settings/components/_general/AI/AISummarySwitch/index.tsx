import { Flex, Select, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AISummarySwitch = () => {
  //   const t = useTranslate();

  const AISummary = useSettingsStore((state) => state.AISummary);
  const setAISummary = useSettingsStore((state) => state.setAISummary);

  //   const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {/* <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink> */}

      {AISummary.enabled && (
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
          value={AISummary.length}
          onChange={(val) => setAISummary({ length: val as "short" | "long" })}
          w={150}
        />
      )}

      <Switch
        checked={AISummary.enabled}
        onChange={(e) => setAISummary({ enabled: e.currentTarget.checked })}
      />
    </Flex>
  );
};

export default AISummarySwitch;
