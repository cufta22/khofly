import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Select, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const MediaSwitch = () => {
  const t = useTranslate();

  const selectedMedia = useSettingsStore((state) => state.selectedMedia);
  const setSelectedMedia = useSettingsStore((state) => state.setSelectedMedia);
  const displayMedia = useSettingsStore((state) => state.displayMedia);
  const setDisplayMedia = useSettingsStore((state) => state.setDisplayMedia);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {displayMedia && (
        <Select
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
          value={selectedMedia}
          onChange={(val) => setSelectedMedia(val as "images" | "videos")}
          w={150}
        />
      )}

      <Switch checked={displayMedia} onChange={(e) => setDisplayMedia(e.currentTarget.checked)} />
    </Flex>
  );
};

export default MediaSwitch;
