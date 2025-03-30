import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const PrivateSearchSwitch = () => {
  const t = useTranslate();

  const privateSearch = useSettingsStore((state) => state.privateSearch);
  const setPrivateSearch = useSettingsStore((state) => state.setPrivateSearch);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      <RemixLink to="/docs/private-search" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink>

      <Switch checked={privateSearch} onChange={(e) => setPrivateSearch(e.currentTarget.checked)} />
    </Flex>
  );
};

export default PrivateSearchSwitch;
