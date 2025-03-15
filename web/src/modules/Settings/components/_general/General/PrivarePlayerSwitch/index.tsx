import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const PrivatePlayerSwitch = () => {
  const t = useTranslate();

  const privatePlayer = useSettingsStore((state) => state.privatePlayer);
  const setPrivatePlayer = useSettingsStore((state) => state.setPrivatePlayer);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex align="center" gap="sm">
      <RemixLink to="/docs/private-player" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink>

      <Switch checked={privatePlayer} onChange={(e) => setPrivatePlayer(e.currentTarget.checked)} />
    </Flex>
  );
};

export default PrivatePlayerSwitch;
