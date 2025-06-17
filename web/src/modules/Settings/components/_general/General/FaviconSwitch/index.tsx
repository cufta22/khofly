import { Flex, Select, Switch } from "@mantine/core";
import { type IFaviconAPI, useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import React from "react";

interface Props {
  isM?: boolean;
  mDisplay?: "switch" | "dropdown";
}

const FaviconSwitch: React.FC<Props> = ({ isM, mDisplay }) => {
  const t = useTranslate();

  const favicon = useSettingsStore((state) => state.favicon);
  const setFavicon = useSettingsStore((state) => state.setFavicon);

  const { enabled, provider } = favicon;

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {((!isM && enabled) || (isM && mDisplay === "dropdown")) && (
        <Select
          disabled={isM && !enabled}
          allowDeselect={false}
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
          value={provider}
          onChange={(val) => setFavicon({ provider: val as IFaviconAPI })}
          w={150}
        />
      )}

      {(!isM || (isM && mDisplay === "switch")) && (
        <Switch
          checked={enabled}
          onChange={(e) => setFavicon({ enabled: e.currentTarget.checked })}
          withThumbIndicator={isM ? false : true}
          size={isM ? "md" : "sm"}
        />
      )}
    </Flex>
  );
};

export default FaviconSwitch;
