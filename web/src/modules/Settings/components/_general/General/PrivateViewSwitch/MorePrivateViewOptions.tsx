import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const MorePrivateViewOptions = () => {
  const privateView = useSettingsStore((state) => state.privateView);
  const setPrivateView = useSettingsStore((state) => state.setPrivateView);

  if (!privateView.enabled) return;

  return (
    <Flex direction="column">
      <Flex align="center" gap="sm" mt="xs">
        <Switch
          checked={privateView.openByDefault}
          onChange={(e) => setPrivateView({ openByDefault: e.currentTarget.checked })}
        />

        <Text ml="sm">Open in Private View by default</Text>
      </Flex>

      <Flex align="center" gap="sm" mt="xs">
        <Switch
          checked={privateView.allowScripts}
          onChange={(e) => setPrivateView({ allowScripts: e.currentTarget.checked })}
        />

        <Text ml="sm">iframe - Allow JavaScript</Text>
      </Flex>

      <Flex align="center" gap="sm" mt="xs">
        <Switch
          checked={privateView.allowSameOrigin}
          onChange={(e) => setPrivateView({ allowSameOrigin: e.currentTarget.checked })}
        />

        <Text ml="sm">iframe - Allow Same Origin</Text>
      </Flex>

      <Flex align="center" gap="sm" mt="xs">
        <Switch
          checked={privateView.allowForms}
          onChange={(e) => setPrivateView({ allowForms: e.currentTarget.checked })}
        />

        <Text ml="sm">iframe - Allow Form submission</Text>
      </Flex>
    </Flex>
  );
};

export default MorePrivateViewOptions;
