import { Switch } from "@mantine/core";
import { useHomepageStore } from "@store/homepage";

const ClockSwitch = () => {
  const displayClock = useHomepageStore((state) => state.displayClock);
  const setDislpayClock = useHomepageStore((state) => state.setDislpayClock);

  return (
    <Switch checked={displayClock} onChange={(e) => setDislpayClock(e.currentTarget.checked)} />
  );
};

export default ClockSwitch;
