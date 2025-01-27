import { Switch } from "@mantine/core";
import { useShortcutsStore } from "@store/shortcuts";

const ShortcutsSwitch = () => {
  const displayShortcuts = useShortcutsStore((state) => state.displayShortcuts);
  const setDisplayShortcuts = useShortcutsStore((state) => state.setDisplayShortcuts);

  return <Switch checked={displayShortcuts} onChange={(e) => setDisplayShortcuts(e.currentTarget.checked)} />;
};

export default ShortcutsSwitch;
