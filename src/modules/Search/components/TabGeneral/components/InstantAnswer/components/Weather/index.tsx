import { useEffect, useState } from "react";
import { IAWrapper } from "../../wrapper";
import {
  Anchor,
  Center,
  Flex,
  LoadingOverlay,
  ScrollArea,
  SegmentedControl,
  Space,
  Text,
} from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import {
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

import classes from "./styles.module.scss";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const SUN_POS_VALUES = [
  -10, -7, -5, 0, 5, 10, 15, 20, 22, 24, 25, 26, 25, 24, 22, 20, 15, 10, 5, 0,
  -5, -7, -10,
];

const IAWeather = () => {
  const { data, isMutating, trigger } = useWeatherSWR();

  // Get data either from localStorage or Geolocation
  const { geolocation, hydrated } = useGeneralStore((state) => ({
    hydrated: state.hydrated,
    geolocation: state.geolocation,
  }));

  const { location } = useGeolocation(!geolocation && hydrated);

  const [unit, setUnit] = useState("C");
  const [areaChart, setAreaChart] = useState<string>("temp");
  const [selectedData, setSelectedData] = useState<OpenWeatherDaily | null>(
    null
  );

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
    if (data?.daily[0]) {
      setSelectedData(data.daily[0]);
    }
  }, [data]);

  const selectedDataDay =
    selectedData && dayjs.unix(selectedData.dt).format("ddd");

  const displayHourly = data?.hourly
    // Filter for current day
    .filter(
      (element, idx) =>
        dayjs.unix(element.dt).format("ddd") === selectedDataDay &&
        idx % 3 === 0
    )
    .map((hr) => ({
      time: dayjs.unix(hr.dt).format("H") + ":00",
      temp: Math.round(hr.temp),
      humidity: hr.humidity,
      wind: hr.wind_speed,
      weather: hr.weather[0].description,
    }));

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

      {data?.current && selectedData && (
        <Flex align="center" justify="space-between" mt="lg">
          <Flex align="center" justify="flex-start">
            {
              // If current is toady then pick from data.current
              selectedDataDay === dayjs.unix(data.current.dt).format("ddd") ? (
                <WeatherIcon
                  code={data.current.weather[0].id as OpenWeatherCode}
                  size="normal"
                  date={data.current.dt}
                />
              ) : selectedData ? (
                // Else pick user selected
                <WeatherIcon
                  code={selectedData.weather[0].id as OpenWeatherCode}
                  size="normal"
                  date={selectedData.dt}
                />
              ) : null
            }
            <Flex
              direction="column"
              align="flex-start"
              justify="flex-start"
              ml="xs"
            >
              <Text fz={38} fw="bold">
                {
                  // If current is toady then pick from data.current
                  selectedDataDay === dayjs.unix(data.current.dt).format("ddd")
                    ? `${Math.round(data?.current.temp)}°`
                    : selectedData
                    ? // Else pick user selected
                      `${Math.round(selectedData?.temp.day)}°`
                    : ""
                }
              </Text>

              <Flex align="center" justify="center" gap="md">
                <Text size="lg" fw="bold">
                  {Math.round(selectedData?.temp.max)}°
                </Text>
                <Text size="sm" c="dimmed">
                  {Math.round(selectedData?.temp.min)}°
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="column" w="30%">
            <AreaChart
              h={80}
              w="100%"
              data={SUN_POS_VALUES.map((val) => ({
                value: val,
              }))}
              withGradient={true}
              withTooltip={false}
              withXAxis={false}
              withYAxis={false}
              gridAxis="none"
              fillOpacity={0.6}
              dotProps={{
                r: 10,
                className: classes.sun_icon_position,
              }}
              referenceLines={[{ y: 0, label: "" }]}
              curveType="monotone"
              dataKey="value"
              type="split"
              strokeWidth={1}
              // withDots={false}
              series={[{ name: "value", color: "yellow.3" }]}
              splitColors={["transparent", "violet.8"]}
            />

            <Text ta="center">Sunset</Text>
          </Flex>
        </Flex>
      )}

      <SegmentedControl
        value={areaChart}
        onChange={(val) => setAreaChart(val)}
        data={[
          { label: "Temperature", value: "temp" },
          { label: "Humidity", value: "humidity" },
          { label: "Wind", value: "wind" },
        ]}
        mt="xl"
        mb="md"
      />

      {displayHourly?.length ? (
        <AreaChart
          h={120}
          data={displayHourly}
          gridAxis="none"
          dataKey="time"
          series={[
            {
              name: areaChart,
              color:
                areaChart === "temp"
                  ? "yellow.5"
                  : areaChart === "humidity"
                  ? "blue.5"
                  : "cyan.4",
            },
            {
              name: "weather",
              color: "green.6",
            },
          ]}
          // curveType="linear"
          mb="xl"
        />
      ) : (
        <Center h={120} mb="xl">
          <Text size="lg" fw="bold">
            Detailed data not available
          </Text>
        </Center>
      )}

      {data?.daily && (
        <ScrollArea h={130} mt="lg">
          <Flex gap="sm" align="center" justify="flex-start">
            {data.daily.map((daily, i) => (
              <WeatherDaily
                key={i}
                code={daily.weather[0].id as OpenWeatherCode}
                onClick={() => setSelectedData(data.daily[i])}
                tempMax={Math.round(daily.temp.max)}
                tempMin={Math.round(daily.temp.min)}
                date={daily.dt}
              />
            ))}
          </Flex>
        </ScrollArea>
      )}

      {/* Loading state */}
      {isMutating && !data && <Space h={300} />}
      <LoadingOverlay visible={isMutating || !data} />
    </IAWrapper>
  );
};

export default IAWeather;
