import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const NewTabSwitch = () => {
  const openInNewTab = useSettingsStore((state) => state.openInNewTab);
  const setOpenInNewTab = useSettingsStore((state) => state.setOpenInNewTab);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={openInNewTab}
      onChange={(e) => setOpenInNewTab(e.currentTarget.checked)}
    />
  );
};

export default NewTabSwitch;
