import { useEffect, useState } from "react";
import { IAWrapper } from "../../wrapper";
import {
  Anchor,
  Flex,
  LoadingOverlay,
  ScrollArea,
  SegmentedControl,
  Space,
  Text,
} from "@mantine/core";
import {
  IconLetterK,
  IconTemperatureCelsius,
  IconTemperatureFahrenheit,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import useWeatherSWR from "src/api/weather/use-weather-query";
import useGeolocation from "@hooks/use-geolocation";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDaily from "./components/WeatherDaily";
import { useGeneralStore } from "@store/general";
import type { OpenWeatherCode, OpenWeatherDaily } from "src/api/weather/types";
import { AreaChart } from "@mantine/charts";

// import SunPosition from "./components/SunPosition";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { useInstanceStore } from "@store/instance";

dayjs.extend(utc);

const formatChartHr = (dt: number) => {
  const hr = dayjs.unix(dt).format("hh");

  return Number.parseInt(hr) >= 12 ? `${hr} PM` : `${hr} AM`;
};

const IAWeather = () => {
  // Get data either from localStorage or Geolocation
  const hydrated = useGeneralStore((state) => state.hydrated);
  const geolocation = useGeneralStore((state) => state.geolocation);
  const { location } = useGeolocation(!geolocation && hydrated);

  const weatherSource = useInstanceStore((state) => state.weatherSource);

  const [unit, setUnit] = useState<"standard" | "metric" | "imperial">("metric");
  const [areaChart, setAreaChart] = useState<string>("temp");
  const [selectedData, setSelectedData] = useState<OpenWeatherDaily | null>(null);

  const linkTextColor = usePrimaryColor(4);

  const {
    data: resData,
    isLoading,
    mutate,
  } = useWeatherSWR({
    lat: geolocation?.lat || location?.latitude,
    lon: geolocation?.lon || location?.longitude,
    units: unit,
    src: weatherSource,
  });
  const data = resData?.data;
  const message = resData?.message;

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data && hydrated && (location?.latitude || geolocation?.lat)) mutate();
  }, [hydrated, geolocation, location]);

  // Update current data
  useEffect(() => {
    if (data?.daily[0]) {
      setSelectedData(data.daily[0]);
    }
  }, [data]);

  const selectedDataDay = selectedData && dayjs.unix(selectedData.dt).format("ddd");

  return (
    <IAWrapper
      label={
        <Text size="sm" c="dimmed">
          Data provided by{" "}
          {message?.includes("OpenWeatherMap") ? (
            <Anchor href="https://openweathermap.org" rel="noreferrer noopener" target="_blank">
              <Text component="span" c={linkTextColor}>
                OpenWeatherMap
              </Text>
            </Anchor>
          ) : message?.includes("Open Meteo") ? (
            <Anchor href="https://open-meteo.com" rel="noreferrer noopener" target="_blank">
              <Text component="span" c={linkTextColor}>
                Open Meteo
              </Text>
            </Anchor>
          ) : (
            "..."
          )}
        </Text>
      }
    >
      <Flex align="center" justify="space-between">
        <Text size="sm" c="dimmed">
          {data?.current && `Time Zone: ${data.timezone}`}
        </Text>

        <SegmentedControl
          value={unit}
          onChange={(val) => setUnit(val as "standard" | "metric" | "imperial")}
          data={[
            {
              value: "metric",
              label: <IconTemperatureCelsius style={getIconStyle(20)} />,
            },
            {
              value: "imperial",
              label: <IconTemperatureFahrenheit style={getIconStyle(20)} />,
            },
            {
              value: "standard",
              label: <IconLetterK style={getIconStyle(20)} stroke={2} />,
              disabled: weatherSource === "om",
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
            <Flex direction="column" align="flex-start" justify="flex-start" ml="xs">
              <Text fz={38} fw="bold">
                {
                  // If current is toady then pick from data.current
                  selectedDataDay === dayjs.unix(data.current.dt).format("ddd")
                    ? `${Math.round(data?.current.temp)}${unit !== "standard" ? "°" : ""}`
                    : selectedData
                    ? // Else pick user selected
                      `${Math.round(selectedData?.temp.day)}${unit !== "standard" ? "°" : ""}`
                    : ""
                }
              </Text>

              <Flex align="center" justify="center" gap="md">
                <Text size="lg" fw="bold">
                  {Math.round(selectedData?.temp.max)}
                  {unit !== "standard" ? "°" : ""}
                </Text>
                <Text size="sm" c="dimmed">
                  {Math.round(selectedData?.temp.min)}
                  {unit !== "standard" ? "°" : ""}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {/* <SunPosition data={data.current} /> */}
        </Flex>
      )}

      <Flex align="center" justify="space-between">
        {data?.current && (
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
        )}
      </Flex>

      {data?.hourly?.length && (
        <ScrollArea>
          <AreaChart
            h={120}
            w={2500}
            pr="sm"
            dataKey="time"
            data={data?.hourly.map((hr) => ({
              time: formatChartHr(hr.dt),
              temp: Math.round(hr.temp),
              humidity: hr.humidity,
              wind: hr.wind_speed,
              weather: hr.weather[0].description,
            }))}
            yAxisProps={{
              tickMargin: 15,
              orientation: "left",
              //  domain: [, "dataMax + 5"],
              domain:
                // Fix Kelvin temp display
                unit === "standard" && areaChart === "temp"
                  ? ["dataMin - 10", "dataMax + 5"]
                  : [0, "dataMax + 5"],
            }}
            xAxisProps={{ tickMargin: 15, orientation: "bottom" }}
            areaChartProps={{ stackOffset: "expand" }}
            // gridAxis="none"
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
        </ScrollArea>
      )}

      {data?.daily && (
        <ScrollArea h={130} mt="lg">
          <Flex gap="sm" align="center" justify="flex-start">
            {data?.daily.map((daily, i) => (
              <WeatherDaily
                key={i}
                code={daily.weather[0].id as OpenWeatherCode}
                onClick={() => setSelectedData(data.daily[i])}
                tempMax={`${Math.round(daily.temp.max)}${unit !== "standard" ? "°" : ""}`}
                tempMin={`${Math.round(daily.temp.min)}${unit !== "standard" ? "°" : ""}`}
                date={daily.dt}
              />
            ))}
          </Flex>
        </ScrollArea>
      )}

      {/* Loading state */}
      {isLoading && !data && <Space h={300} />}
      <LoadingOverlay visible={isLoading || !data} />
    </IAWrapper>
  );
};

export default IAWeather;
