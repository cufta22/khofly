import { Flex, Select, Switch } from "@mantine/core";
import { type IFaviconAPI, useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";

const FaviconSwitch = () => {
  const t = useTranslate();

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const setDisplayFavicon = useSettingsStore((state) => state.setDisplayFavicon);
  const faviconProvider = useSettingsStore((state) => state.faviconProvider);
  const setFaviconProvider = useSettingsStore((state) => state.setFaviconProvider);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {displayFavicon && (
        <Select
          data={[
            {
              label: t("pages.settings.general.toggle_favicon_options.google"),
              value: "google",
            },
            {
              label: t("pages.settings.general.toggle_favicon_options.DDG"),
              value: "duckduckgo",
            },
            {
              label: t("pages.settings.general.toggle_favicon_options.favicone"),
              value: "favicone",
            },
          ]}
          value={faviconProvider}
          onChange={(val) => setFaviconProvider(val as IFaviconAPI)}
          w={150}
        />
      )}

      <Switch
        checked={displayFavicon}
        onChange={(e) => setDisplayFavicon(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default FaviconSwitch;
