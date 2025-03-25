import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const FaviconSwitch = () => {
  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const setDisplayFavicon = useSettingsStore((state) => state.setDisplayFavicon);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={displayFavicon}
      onChange={(e) => setDisplayFavicon(e.currentTarget.checked)}
    />
  );
};

export default FaviconSwitch;
