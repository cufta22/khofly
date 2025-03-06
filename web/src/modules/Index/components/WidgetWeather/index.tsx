import { Flex, Text } from "@mantine/core";
import classes from "./styles.module.scss";
import useWeatherSWR from "src/api/weather/use-weather-query";
import { useGeneralStore } from "@store/general";
import useGeolocation from "@hooks/use-geolocation";
import clsx from "clsx";
import { IS_DAY } from "@utils/resources/isDay";
import WeatherIcon from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Weather/components/WeatherIcon";
import { OpenWeatherCode } from "src/api/weather/types";
import { useEffect } from "react";

const WidgetWeather = () => {
  // Get data either from localStorage or Geolocation
  const hydrated = useGeneralStore((state) => state.hydrated);
  const geolocation = useGeneralStore((state) => state.geolocation);
  const { location } = useGeolocation(!geolocation && hydrated);

  const {
    data: resData,
    isLoading,
    mutate,
  } = useWeatherSWR({
    lat: geolocation?.lat || location?.latitude,
    lon: geolocation?.lon || location?.longitude,
    units: "metric",
    src: "owm",
  });
  const data = resData?.data;
  const message = resData?.message;

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data && hydrated && !isLoading && (location?.latitude || geolocation?.lat)) mutate();
  }, [hydrated]);

  return (
    <Flex
      className={clsx(
        classes.widget_weather,
        { [classes.bg_day]: IS_DAY },
        { [classes.bg_night]: !IS_DAY }
      )}
      direction="column"
      align="center"
      p="lg"
    >
      <Text fz={26} fw="bold" mb="md">
        {data?.timezone}
      </Text>

      <Flex w="100%" align="center" mb="md">
        {data?.current && (
          <WeatherIcon
            code={data.current.weather[0].id as OpenWeatherCode}
            size="large"
            date={data.current.dt}
            isWidget
          />
        )}

        <Flex direction="column" ml="xs">
          {data?.current && <Text fz={38} fw="bold">{`${Math.round(data?.current.temp)}°`}</Text>}

          {data?.current && <Text fz={24}>{`${data?.current.weather[0]?.description}`}</Text>}
        </Flex>
      </Flex>

      <Flex w="100%" align="center" justify="space-between">
        <Flex direction="column" align="center">
          <Text>Wind</Text>
          {data?.current && <Text fz={22}>{`${data?.current.wind_speed}`}</Text>}
        </Flex>

        <Flex direction="column" align="center">
          <Text>Humidity</Text>
          {data?.current && <Text fz={22}>{`${data?.current.humidity}`}</Text>}
        </Flex>

        <Flex direction="column" align="center">
          <Text>Feels like</Text>
          {data?.current && <Text fz={22}>{`${data?.current.feels_like}`}</Text>}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WidgetWeather;
