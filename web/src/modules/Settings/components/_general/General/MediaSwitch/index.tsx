import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Select, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const MediaSwitch = () => {
  const t = useTranslate();

  const generalMedia = useSettingsStore((state) => state.generalMedia);
  const setGeneralMedia = useSettingsStore((state) => state.setGeneralMedia);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {generalMedia.enabled && (
        <Select
          allowDeselect={false}
          data={[
            {
              label: t("pages.settings.general.display_media_options.images"),
              value: "images",
            },
            {
              label: t("pages.settings.general.display_media_options.videos"),
              value: "videos",
            },
          ]}
          value={generalMedia.type}
          onChange={(val) => setGeneralMedia({ type: val as "images" | "videos" })}
          w={150}
        />
      )}

      <Switch
        checked={generalMedia.enabled}
        onChange={(e) => setGeneralMedia({ enabled: e.currentTarget.checked })}
      />
    </Flex>
  );
};

export default MediaSwitch;
