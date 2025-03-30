import { Switch } from "@mantine/core";
import { useStatrpageStore } from "@store/startpage";
import commonClasses from "../../../common/styles.module.scss";

const ShortcutsSwitch = () => {
  const displayShortcuts = useStatrpageStore((state) => state.displayShortcuts);
  const setDisplayShortcuts = useStatrpageStore((state) => state.setDisplayShortcuts);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={displayShortcuts}
      onChange={(e) => setDisplayShortcuts(e.currentTarget.checked)}
    />
  );
};

export default ShortcutsSwitch;
