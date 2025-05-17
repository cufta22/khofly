import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const PrivateViewSwitch = () => {
  const t = useTranslate();

  const privateView = useSettingsStore((state) => state.privateView.enabled);
  const setPrivateView = useSettingsStore((state) => state.setPrivateView);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align="center" gap="sm">
      <RemixLink to="/docs/private-view" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink>

      <Switch
        checked={privateView}
        onChange={(e) => setPrivateView({ enabled: e.currentTarget.checked })}
      />
    </Flex>
  );
};

export default PrivateViewSwitch;
