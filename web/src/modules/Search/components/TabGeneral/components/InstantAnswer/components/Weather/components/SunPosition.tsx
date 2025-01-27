import { AreaChart } from "@mantine/charts";
import { Flex, Text } from "@mantine/core";
import classes from "../styles.module.scss";
import { OpenWeatherCurrent } from "src/api/weather/types";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import clsx from "clsx";
import { IconSun } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
dayjs.extend(utc);

// This just renders UI for chart
const SUN_POS_VALUES = [
  -10, -7, -5, 0, 5, 10, 15, 20, 22, 24, 25, 25, 25, 24, 22, 20, 15, 10, 5, 0, -5, -7,
  -10,
];

const mapRange = (
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => {
  return Math.round(((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin);
};

interface Porps {
  data: OpenWeatherCurrent;
}

const SunPosition: React.FC<Porps> = ({ data }) => {
  const sunriseHr = parseInt(dayjs.unix(data.sunrise).format("HH"));
  const sunsetHr = parseInt(dayjs.unix(data.sunset).format("HH"));
  const currentHr = parseInt(dayjs.unix(data.dt).format("HH"));

  const sun_pos =
    currentHr < sunriseHr
      ? 2
      : currentHr > sunsetHr
      ? 23
      : mapRange(currentHr, 4, 20, sunriseHr, sunsetHr);

  return (
    <Flex direction="column" w={130}>
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
          className: clsx(
            classes.sun_icon_pos,
            classes[`sun_icon_pos--${sun_pos}`]
            // classes[`sun_icon_pos--2`]
          ),
        }}
        referenceLines={[{ y: 0, label: "" }]}
        curveType="natural"
        dataKey="value"
        type="split"
        strokeWidth={3}
        // withDots={false}
        series={[{ name: "value", color: "yellow.5" }]}
        splitColors={["transparent", "violet.8"]}
      />

      <Flex align="center" justify="space-between" mt="xs">
        <Text c="dimmed" size="xs">
          {dayjs.unix(data.sunrise).format("HH:MM")}
        </Text>

        <Text c="dimmed" size="xs">
          {dayjs.unix(data.sunset).format("HH:MM")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SunPosition;
