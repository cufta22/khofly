import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

interface Props {
  isM?: boolean;
}

const PrivateSearchSwitch: React.FC<Props> = ({ isM }) => {
  const t = useTranslate();

  const privateSearch = useSettingsStore((state) => state.privateSearch);
  const setPrivateSearch = useSettingsStore((state) => state.setPrivateSearch);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      {!isM && (
        <RemixLink to="/docs/private-search" target="_blank">
          <Text component="span" c={linkTextColor}>
            {t("pages.settings.general.learn_more")}
          </Text>
        </RemixLink>
      )}

      <Switch
        checked={privateSearch}
        onChange={(e) => setPrivateSearch(e.currentTarget.checked)}
        withThumbIndicator={isM ? false : true}
        size={isM ? "md" : "sm"}
      />
    </Flex>
  );
};

export default PrivateSearchSwitch;
