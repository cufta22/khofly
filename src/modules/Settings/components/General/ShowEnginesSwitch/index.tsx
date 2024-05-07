import { Switch } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const ShowEnginesSwitch = () => {
  const { showEngines, setShowEngines } = useSettingsStore((state) => ({
    showEngines: state.showEngines,
    setShowEngines: state.setShowEngines,
  }));

  return (
    <Switch
      checked={showEngines}
      onChange={(e) => setShowEngines(e.currentTarget.checked)}
    />
  );
};

export default ShowEnginesSwitch;
