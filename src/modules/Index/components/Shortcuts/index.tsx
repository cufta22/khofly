import { Flex } from "@mantine/core";

import { useSettingsStore } from "@store/settings";
import Shortcut from "./components/Shortcut";

export const Shortcuts = () => {
  const { shortcuts } = useSettingsStore((state) => ({
    shortcuts: state.shortcuts,
  }));

  const items = shortcuts.map((item, i) => {
    return <Shortcut key={i} {...item} />;
  });

  return (
    <Flex gap="sm" mt="xl">
      {items}
    </Flex>
  );
};
export default Shortcuts;
