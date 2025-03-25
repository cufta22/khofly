import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Select, Switch } from "@mantine/core";
import { type IAutocompleteEngines, useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const AutocompleteSwitch = () => {
  const t = useTranslate();

  const useAutocomplete = useSettingsStore((state) => state.useAutocomplete);
  const setUseAutocomplete = useSettingsStore((state) => state.setUseAutocomplete);
  const autocompleteEngine = useSettingsStore((state) => state.autocompleteEngine);
  const setAutocompleteEngine = useSettingsStore((state) => state.setAutocompleteEngine);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {useAutocomplete && (
        <Select
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
          value={autocompleteEngine}
          onChange={(val) => setAutocompleteEngine(val as IAutocompleteEngines)}
          w={150}
        />
      )}

      <Switch
        checked={useAutocomplete}
        onChange={(e) => setUseAutocomplete(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default AutocompleteSwitch;
