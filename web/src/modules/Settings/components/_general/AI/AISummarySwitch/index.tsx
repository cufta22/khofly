import { Flex, Select, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

interface Props {
  isM?: boolean;
  mDisplay?: "switch" | "dropdown";
}

const AISummarySwitch: React.FC<Props> = ({ isM, mDisplay }) => {
  //   const t = useTranslate();

  const AISummary = useSettingsStore((state) => state.AISummary);
  const setAISummary = useSettingsStore((state) => state.setAISummary);

  //   const linkTextColor = usePrimaryColor(4);

  const { enabled, length } = AISummary;

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {/* <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink> */}

      {((!isM && enabled) || (isM && mDisplay === "dropdown")) && (
        <Select
          disabled={isM && !enabled}
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
          value={length}
          onChange={(val) => setAISummary({ length: val as "short" | "long" })}
          w={150}
        />
      )}

      {(!isM || (isM && mDisplay === "switch")) && (
        <Switch
          checked={enabled}
          onChange={(e) => setAISummary({ enabled: e.currentTarget.checked })}
          withThumbIndicator={isM ? false : true}
          size={isM ? "md" : "sm"}
        />
      )}
    </Flex>
  );
};

export default AISummarySwitch;
