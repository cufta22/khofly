import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const NewTabSwitch = () => {
  const { openInNewTab, setOpenInNewTab } = useSettingsStore((state) => ({
    openInNewTab: state.openInNewTab,
    setOpenInNewTab: state.setOpenInNewTab,
  }));

  return (
    <Switch
      checked={openInNewTab}
      onChange={(e) => setOpenInNewTab(e.currentTarget.checked)}
    />
  );
};

export default NewTabSwitch;
