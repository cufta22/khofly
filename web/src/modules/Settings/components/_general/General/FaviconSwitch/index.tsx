import { Flex, Select, Switch } from "@mantine/core";
import { type IFaviconAPI, useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";

const FaviconSwitch = () => {
  const t = useTranslate();

  const favicon = useSettingsStore((state) => state.favicon);
  const setFavicon = useSettingsStore((state) => state.setFavicon);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {favicon.enabled && (
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
          value={favicon.provider}
          onChange={(val) => setFavicon({ provider: val as IFaviconAPI })}
          w={150}
        />
      )}

      <Switch
        checked={favicon.enabled}
        onChange={(e) => setFavicon({ enabled: e.currentTarget.checked })}
      />
    </Flex>
  );
};

export default FaviconSwitch;
