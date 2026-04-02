import { Switch } from '@mantine/core';
import { useHomepageStore } from '@store/homepage';

const WeatherSwitch = () => {
  const displayWeather = useHomepageStore((state) => state.displayWeather);
  const setDislpayWeather = useHomepageStore((state) => state.setDislpayWeather);

  return (
    <Switch checked={displayWeather} onChange={(e) => setDislpayWeather(e.currentTarget.checked)} />
  );
};

export default WeatherSwitch;
