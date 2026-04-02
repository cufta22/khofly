import { Flex } from '@mantine/core';

import Shortcut from './components/Shortcut';
import classes from './styles.module.scss';
import { useHomepageStore } from '@store/homepage';
import ShortcutNew from './components/ShortcutNew';
import ShortcutGroup from './components/ShortcutGroup';

export const Shortcuts = () => {
  const shortcuts = useHomepageStore((state) => state.shortcuts);

  const items = shortcuts.map((sc, i) => {
    return sc.type === 'item' ? (
      <Shortcut key={i} idx={i} {...sc} />
    ) : (
      <ShortcutGroup key={i} idx={i} {...sc} />
    );
  });

  return (
    <Flex className={classes.shortcuts_container} gap='sm' mt='md'>
      {items}
      <ShortcutNew />
    </Flex>
  );
};
export default Shortcuts;
