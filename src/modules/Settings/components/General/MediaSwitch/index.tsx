import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Select, Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const MediaSwitch = () => {
  const t = useTranslate();

  const { selectedMedia, setSelectedMedia, displayMedia, setDisplayMedia } =
    useSettingsStore((state) => ({
      selectedMedia: state.selectedMedia,
      setSelectedMedia: state.setSelectedMedia,
      displayMedia: state.displayMedia,
      setDisplayMedia: state.setDisplayMedia,
    }));

  return (
    <Flex align="center" gap="sm">
      {displayMedia && (
        <Select
          data={[
            {
              label: t("pages.settings.general.media_images"),
              value: "images",
            },
            {
              label: t("pages.settings.general.media_videos"),
              value: "videos",
            },
          ]}
          value={selectedMedia}
          onChange={(val) => setSelectedMedia(val as "images" | "videos")}
          w={150}
        />
      )}

      <Switch
        checked={displayMedia}
        onChange={(e) => setDisplayMedia(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default MediaSwitch;
