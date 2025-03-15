import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const NewTabSwitch = () => {
  const openInNewTab = useSettingsStore((state) => state.openInNewTab);
  const setOpenInNewTab = useSettingsStore((state) => state.setOpenInNewTab);

  return <Switch checked={openInNewTab} onChange={(e) => setOpenInNewTab(e.currentTarget.checked)} />;
};

export default NewTabSwitch;
