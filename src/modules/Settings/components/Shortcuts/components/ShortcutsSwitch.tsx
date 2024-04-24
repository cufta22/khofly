import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const ShortcutsSwitch = () => {
  const { displayShortcuts, setDisplayShortcuts } = useSettingsStore(
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
