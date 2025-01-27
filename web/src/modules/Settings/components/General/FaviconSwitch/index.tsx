import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const FaviconSwitch = () => {
  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const setDisplayFavicon = useSettingsStore((state) => state.setDisplayFavicon);

  return <Switch checked={displayFavicon} onChange={(e) => setDisplayFavicon(e.currentTarget.checked)} />;
};

export default FaviconSwitch;
