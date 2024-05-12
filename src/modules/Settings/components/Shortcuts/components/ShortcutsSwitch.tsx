import { Switch } from "@mantine/core";
import { useShortcutsStore } from "@store/shortcuts";

const ShortcutsSwitch = () => {
  const { displayShortcuts, setDisplayShortcuts } = useShortcutsStore(
    (state) => ({
      displayShortcuts: state.displayShortcuts,
      setDisplayShortcuts: state.setDisplayShortcuts,
    })
  );

  return (
    <Switch
      checked={displayShortcuts}
      onChange={(e) => setDisplayShortcuts(e.currentTarget.checked)}
    />
  );
};

export default ShortcutsSwitch;
