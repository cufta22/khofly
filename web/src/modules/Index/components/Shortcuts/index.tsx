import { Flex } from "@mantine/core";

import Shortcut from "./components/Shortcut";
import classes from "./styles.module.scss";
import { useShortcutsStore } from "@store/shortcuts";

export const Shortcuts = () => {
  const shortcuts = useShortcutsStore((state) => state.shortcuts);

  const items = shortcuts.map((item, i) => {
    return <Shortcut key={i} idx={i} {...item} />;
  });

  return (
    <Flex className={classes.shortcuts_container} gap="sm" mt="md">
      {items}
    </Flex>
  );
};
export default Shortcuts;
