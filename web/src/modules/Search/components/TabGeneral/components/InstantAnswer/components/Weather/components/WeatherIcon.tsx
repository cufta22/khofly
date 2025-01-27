import { Flex, useMantineTheme } from "@mantine/core";
import {
  IconCloud,
  IconCloudRain,
  IconCloudStorm,
  IconGrain,
  IconMist,
  IconMoon,
  IconMoonStars,
  IconSnowflake,
  IconSun,
  IconTornado,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import React from "react";

import classes from "../styles.module.scss";
import { OpenWeatherCode } from "src/api/weather/types";
import dayjs from "dayjs";

interface Props {
  code: OpenWeatherCode;
  size: "normal" | "small";
  date: number;
}

const WeatherIcon: React.FC<Props> = ({ code, size, date }) => {
  const theme = useMantineTheme();

  const hours = parseInt(dayjs.unix(date).format("HH"));
  const isNight = hours >= 21 || hours < 8;

  const IconMain = isNight ? IconMoon : IconSun;
  const colorMain = isNight ? theme.colors.gray[7] : theme.colors.orange[5];

  const modifier = size === "normal" ? 1.6 : 0.8;

  const sizeBig = 52 * modifier;
  const sizeNormal = 46 * modifier;
  const sizeSmall = 36 * modifier;

  switch (code) {
    case 800:
      return (
        <IconMain
          style={getIconStyle(sizeBig)}
          stroke={isNight ? 1 : 2}
          color={colorMain}
          fill={colorMain}
        />
      );

    case 801:
      return (
        <Flex w={sizeBig} h={sizeBig} pos="relative">
          <IconCloud
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
            }}
            color={theme.colors.gray[4]}
            fill={theme.colors.gray[4]}
          />
          <IconMain
            style={{
              ...getIconStyle(sizeSmall),
              position: "absolute",
              top: 0,
              right: 0,
            }}
            stroke={isNight ? 2 : 2}
            color={colorMain}
            fill={colorMain}
          />
        </Flex>
      );

    case 802:
      return (
        <IconCloud
          style={getIconStyle(sizeBig)}
          stroke={2}
          color={theme.colors.gray[4]}
          fill={theme.colors.gray[4]}
        />
      );

    case 803:
    case 804:
      return (
        <Flex w={sizeBig} h={sizeBig} pos="relative">
          <IconCloud
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              top: 0,
              right: 0,
            }}
            color={theme.colors.gray[6]}
            fill={theme.colors.gray[6]}
          />
          <IconCloud
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
            }}
            color={theme.colors.gray[4]}
            fill={theme.colors.gray[4]}
          />
        </Flex>
      );

    case 300: // light intensity drizzle
    case 301: // drizzle
    case 302: // heavy intensity drizzle
    case 310: // light intensity drizzle rain
    case 311: // drizzle rain
    case 312: // heavy intensity drizzle rain
    case 313: // shower rain and drizzle
    case 314: // heavy shower rain and drizzle
    case 321: // shower drizzle
    case 520:
    case 521:
    case 522:
    case 531:
      return (
        <Flex w={sizeBig} h={sizeBig} pos="relative">
          <IconCloud
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              top: 0,
              right: 0,
            }}
            color={theme.colors.gray[7]}
            fill={theme.colors.gray[7]}
          />
          <IconCloudRain
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
            }}
            className={classes.weather_icon_cloud_rain}
            color={theme.colors.gray[6]}
            fill={theme.colors.gray[6]}
          />
        </Flex>
      );

    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      return (
        <Flex w={sizeBig} h={sizeBig} pos="relative">
          <IconMain
            style={{
              ...getIconStyle(sizeSmall),
              position: "absolute",
              top: 0,
              right: 0,
            }}
            stroke={isNight ? 1 : 2}
            color={colorMain}
            fill={colorMain}
          />
          <IconCloudRain
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
            }}
            className={classes.weather_icon_cloud_rain}
            color={theme.colors.gray[4]}
            fill={theme.colors.gray[4]}
          />
        </Flex>
      );

    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      return (
        <Flex w={sizeBig} h={sizeBig} pos="relative">
          <IconCloud
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              top: 0,
              right: 0,
            }}
            color={theme.colors.gray[7]}
            fill={theme.colors.gray[7]}
          />
          <IconCloudStorm
            style={{
              ...getIconStyle(sizeNormal),
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
            }}
            className={classes.weather_icon_cloud_storm}
            color={theme.colors.gray[6]}
            fill={theme.colors.gray[6]}
          />
        </Flex>
      );

    case 511: // freezing rain
    case 600: // light snow
    case 601: // snow
    case 602: // heavy snow
    case 611: // sleet
    case 612: // light shower sleet
    case 613: // shower sleet
    case 615: // light rain and snow
    case 616: // rain and snow
    case 620: // light shower snow
    case 621: // shower snow
    case 622: // heavy shower snow
      return (
        <IconSnowflake
          style={getIconStyle(sizeBig)}
          stroke={2}
          color={theme.colors.blue[3]}
          fill={theme.colors.blue[3]}
        />
      );

    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
      return (
        <IconMist
          style={getIconStyle(sizeBig)}
          stroke={2}
          color={theme.colors.gray[7]}
          fill={theme.colors.gray[7]}
        />
      );

    case 781: // Tornado
      return (
        <IconTornado
          style={getIconStyle(sizeBig)}
          stroke={2}
          color={theme.colors.gray[5]}
          fill={theme.colors.gray[5]}
        />
      );

    default:
      return (
        <IconMain
          style={getIconStyle(sizeBig)}
          stroke={isNight ? 1 : 2}
          color={colorMain}
          fill={colorMain}
        />
      );
  }
};

export default WeatherIcon;
