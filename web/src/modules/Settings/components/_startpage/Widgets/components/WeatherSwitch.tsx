import { Switch } from "@mantine/core";
import { useStatrpageStore } from "@store/startpage";

const WeatherSwitch = () => {
  const displayWeather = useStatrpageStore((state) => state.displayWeather);
  const setDislpayWeather = useStatrpageStore((state) => state.setDislpayWeather);

  return (
    <Switch checked={displayWeather} onChange={(e) => setDislpayWeather(e.currentTarget.checked)} />
  );
};

export default WeatherSwitch;
