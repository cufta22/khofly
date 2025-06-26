import { Flex, Text, UnstyledButton } from "@mantine/core";

import classes from "../styles.module.scss";
import { OpenWeatherCode } from "src/api/weather/types";
import WeatherIcon from "./WeatherIcon";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface Props {
  onClick: () => void;
  tempMin: string;
  tempMax: string;
  code: OpenWeatherCode;
  date: number;
}

const WeatherDaily: React.FC<Props> = ({
  code,
  onClick,
  tempMax,
  tempMin,
  date,
}) => {
  return (
    <UnstyledButton
      className={classes.weather_daily}
      w={90}
      h={120}
      onClick={onClick}
    >
      <Text size="sm" fw={600} mb={8} c="dimmed">
        {dayjs.unix(date).format("ddd")}
      </Text>

      <WeatherIcon code={code} size="small" date={date} />

      <Flex align="center" justify="center" gap="md">
        <Text size="lg" fw="bold">
          {tempMax}
        </Text>
        <Text size="sm" c="dimmed">
          {tempMin}
        </Text>
      </Flex>
    </UnstyledButton>
  );
};
export default WeatherDaily;
