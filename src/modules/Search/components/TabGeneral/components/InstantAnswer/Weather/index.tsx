import { useEffect, useState } from "react";
import { IAWrapper } from "../wrapper";
import {
  Anchor,
  Flex,
  LoadingOverlay,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@mantine/core";
import {
  IconCloud,
  IconTemperatureCelsius,
  IconTemperatureFahrenheit,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import useWeatherSWR from "src/api/weather/use-weather-query";
import useGeolocation from "@hooks/use-geolocation";
import WeatherIcon from "./WeatherIcon";
import WeatherDaily from "./WeatherDaily";
import { useGeneralStore } from "@store/general";
import { OpenWeatherCode, OpenWeatherDaily } from "src/api/weather/types";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const IAWeather = () => {
  const { data, isMutating, trigger } = useWeatherSWR();

  // Get data either from localStorage or Geolocation
  const { geolocation, hydrated } = useGeneralStore((state) => ({
    hydrated: state.hydrated,
    geolocation: state.geolocation,
  }));
  console.log(geolocation);

  const { location } = useGeolocation(!geolocation && hydrated);

  const [unit, setUnit] = useState("C");

  const [currentData, setCurrentData] = useState<OpenWeatherDaily | null>(null);

  // Get geolocation
  useEffect(() => {
    if (location || geolocation) {
      trigger(
        geolocation || { lat: location?.latitude, lon: location?.longitude }
      );
    }
  }, [location, geolocation]);

  // Update current data
  useEffect(() => {
    // if (data?.timelines) {
    //   setCurrentData(data.timelines.daily[0]);
    // }
  }, [data]);

  return (
    <IAWrapper
      label={
        <Text size="sm" c="dimmed">
          Data provided by{" "}
          <Anchor href="https://openweathermap.org" rel="noreferrer noopener">
            <Text component="span" c="blue.4">
              OpenWeather
            </Text>
          </Anchor>
        </Text>
      }
    >
      <Flex align="center" justify="space-between">
        <Text size="sm" c="dimmed">
          {data?.current && `Showing data for ${data.timezone}`}
        </Text>

        <SegmentedControl
          value={unit}
          onChange={(val) => setUnit(val)}
          data={[
            {
              value: "F",
              label: <IconTemperatureFahrenheit style={getIconStyle(20)} />,
            },
            {
              value: "C",
              label: <IconTemperatureCelsius style={getIconStyle(20)} />,
            },
          ]}
        />
      </Flex>

      {data?.current && (
        <Flex align="center" justify="flex-start" mt="lg">
          <WeatherIcon code={801} size="normal" date={data.current.dt} />

          <Flex align="center" justify="flex-start" mt="lg">
            <Text fz={32} fw="bold" ml="xs">
              {Math.round(data?.current.temp)}°
            </Text>

            <Text size="md" ml="xs">
              {dayjs
                .unix(data.current.dt)
                .format("ddd - DD/MM/YYYY - HH:mm:ss")}
            </Text>
          </Flex>
        </Flex>
      )}

      {data?.daily && (
        <ScrollArea h={130} mt="lg">
          <Flex gap="sm" align="center" justify="flex-start">
            {data.daily.map((daily, i) => (
              <WeatherDaily
                key={i}
                code={daily.weather[0].id as OpenWeatherCode}
                onClick={() => {}}
                tempMax={Math.round(daily.temp.max)}
                tempMin={Math.round(daily.temp.min)}
                date={daily.dt}
              />
            ))}
          </Flex>
        </ScrollArea>
      )}

      <LoadingOverlay visible={isMutating || !data} />
    </IAWrapper>
  );
};

export default IAWeather;
