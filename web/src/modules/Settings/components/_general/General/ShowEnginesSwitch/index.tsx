import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import commonClasses from "../../../common/styles.module.scss";

const ShowEnginesSwitch = () => {
  const showEngines = useSettingsStore((state) => state.showEngines);
  const setShowEngines = useSettingsStore((state) => state.setShowEngines);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={showEngines}
      onChange={(e) => setShowEngines(e.currentTarget.checked)}
    />
  );
};

export default ShowEnginesSwitch;
