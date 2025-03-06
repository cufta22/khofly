import { Switch } from "@mantine/core";
import { useStatrpageStore } from "@store/startpage";

const ShortcutsSwitch = () => {
  const displayShortcuts = useStatrpageStore((state) => state.displayShortcuts);
  const setDisplayShortcuts = useStatrpageStore((state) => state.setDisplayShortcuts);

  return (
    <Switch
      checked={displayShortcuts}
      onChange={(e) => setDisplayShortcuts(e.currentTarget.checked)}
    />
  );
};

export default ShortcutsSwitch;
