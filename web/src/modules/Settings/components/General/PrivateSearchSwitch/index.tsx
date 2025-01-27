import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const PrivateSearchSwitch = () => {
  const t = useTranslate();

  const privateSearch = useSettingsStore((state) => state.privateSearch);
  const setPrivateSearch = useSettingsStore((state) => state.setPrivateSearch);

  return (
    <Flex align="center" gap="sm">
      <Text component="span" c="blue.4">
        <RemixLink to="/docs/private-search" target="_blank">
          {t("pages.settings.general.learn_more")}
        </RemixLink>
      </Text>

      <Switch checked={privateSearch} onChange={(e) => setPrivateSearch(e.currentTarget.checked)} />
    </Flex>
  );
};

export default PrivateSearchSwitch;
