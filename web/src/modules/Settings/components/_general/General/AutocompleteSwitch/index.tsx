import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Select, Switch } from "@mantine/core";
import { type IAutocompleteEngines, useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AutocompleteSwitch = () => {
  const t = useTranslate();

  const autocomplete = useSettingsStore((state) => state.autocomplete);
  const setAutocomplete = useSettingsStore((state) => state.setAutocomplete);

  const { enabled, provider } = autocomplete;

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {enabled && (
        <Select
          allowDeselect={false}
          data={[
            {
              label: t("pages.settings.general.toggle_autocomplete_options.google"),
              value: "google",
            },
            {
              label: t("pages.settings.general.toggle_autocomplete_options.DDG"),
              value: "duckduckgo",
            },
            {
              label: t("pages.settings.general.toggle_autocomplete_options.brave"),
              value: "brave",
            },
            {
              label: t("pages.settings.general.toggle_autocomplete_options.qwant"),
              value: "qwant",
            },
          ]}
          value={provider}
          onChange={(val) => setAutocomplete({ provider: val as IAutocompleteEngines })}
          w={150}
        />
      )}

      <Switch
        checked={enabled}
        onChange={(e) => setAutocomplete({ enabled: e.currentTarget.checked })}
      />
    </Flex>
  );
};

export default AutocompleteSwitch;
