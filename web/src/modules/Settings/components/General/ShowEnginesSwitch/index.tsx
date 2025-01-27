import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const ShowEnginesSwitch = () => {
  const showEngines = useSettingsStore((state) => state.showEngines);
  const setShowEngines = useSettingsStore((state) => state.setShowEngines);

  return <Switch checked={showEngines} onChange={(e) => setShowEngines(e.currentTarget.checked)} />;
};

export default ShowEnginesSwitch;
