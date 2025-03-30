import { Switch } from "@mantine/core";
import { useStatrpageStore } from "@store/startpage";

const ClockSwitch = () => {
  const displayClock = useStatrpageStore((state) => state.displayClock);
  const setDislpayClock = useStatrpageStore((state) => state.setDislpayClock);

  return (
    <Switch checked={displayClock} onChange={(e) => setDislpayClock(e.currentTarget.checked)} />
  );
};

export default ClockSwitch;
