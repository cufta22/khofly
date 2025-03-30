import { Flex } from "@mantine/core";

import Shortcut from "./components/Shortcut";
import classes from "./styles.module.scss";
import { useStatrpageStore } from "@store/startpage";
import ShortcutNew from "./components/ShortcutNew";

export const Shortcuts = () => {
  const shortcuts = useStatrpageStore((state) => state.shortcuts);

  const items = shortcuts.map((item, i) => {
    return <Shortcut key={i} idx={i} {...item} />;
  });

  return (
    <Flex className={classes.shortcuts_container} gap="sm" mt="md">
      {items}
      <ShortcutNew  />
    </Flex>
  );
};
export default Shortcuts;
