import { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

const WidgetClock = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const [time, setTime] = useState(new Date());

  // Colors
  const colorSurface = colorScheme === "dark" ? theme.colors.dark["6"] : theme.white;
  const colorHourMarks = colorScheme === "dark" ? theme.colors.dark["0"] : theme.colors.dark["7"];
  const colorMinuteMarks = colorScheme === "dark" ? theme.colors.dark["2"] : theme.colors.dark["5"];
  const colorHourHand = colorScheme === "dark" ? theme.colors.gray["0"] : theme.colors.dark["7"];
  const colorMinuteHand = colorScheme === "dark" ? theme.colors.dark["0"] : theme.colors.dark["8"];
  const colorSecondHand = colorScheme === "dark" ? theme.colors.red["7"] : theme.colors.red["7"];
  const colorCenter = colorScheme === "dark" ? theme.colors.red["7"] : theme.colors.red["7"];

  // Calculate the rotation angles for clock hands
  const secondRatio = time.getSeconds() / 60;
  const minuteRatio = (secondRatio + time.getMinutes()) / 60;
  const hourRatio = (minuteRatio + time.getHours()) / 12;

  // Convert ratios to degrees for SVG rotation
  const secondHandRotation = secondRatio * 360;
  const minuteHandRotation = minuteRatio * 360;
  const hourHandRotation = hourRatio * 360;

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className={classes.widget_clock}>
      <svg viewBox="0 0 100 100">
        {/* Clock face */}
        <circle
          cx="50"
          cy="50"
          r="50"
          fill={colorSurface}
          stroke={colorScheme === "dark" ? theme.colors.dark["8"] : theme.colors.gray["2"]}
          strokeWidth={colorScheme === "dark" ? "0" : "1"}
        />

        {/* Hour marks */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const x1 = 50 + 43 * Math.sin(angle);
          const y1 = 50 - 43 * Math.cos(angle);
          const x2 = 50 + 47 * Math.sin(angle);
          const y2 = 50 - 47 * Math.cos(angle);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colorHourMarks}
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}

        {/* Minute marks */}
        {[...Array(60)].map((_, i) => {
          if (i % 5 !== 0) {
            const angle = i * 6 * (Math.PI / 180);
            const x1 = 50 + 45 * Math.sin(angle);
            const y1 = 50 - 45 * Math.cos(angle);
            const x2 = 50 + 47 * Math.sin(angle);
            const y2 = 50 - 47 * Math.cos(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colorMinuteMarks}
                strokeWidth="1"
                strokeLinecap="round"
              />
            );
          }
          return null;
        })}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke={colorHourHand}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hourHandRotation}, 50, 50)`}
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke={colorMinuteHand}
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${minuteHandRotation}, 50, 50)`}
        />

        {/* Second hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke={colorSecondHand}
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondHandRotation}, 50, 50)`}
        />

        {/* Center dot */}
        <circle cx="50" cy="50" r="2" fill={colorCenter} />
      </svg>
    </div>
  );
};

export default WidgetClock;
