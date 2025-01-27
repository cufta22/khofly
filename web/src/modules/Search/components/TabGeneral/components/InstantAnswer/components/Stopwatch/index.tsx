import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Paper,
  RingProgress,
  Text,
} from "@mantine/core";
import { IAWrapper } from "../../wrapper";
import classes from "./styles.module.scss";
import {
  IconPlayerPauseFilled,
  IconPlayerPlay,
  IconPlayerPlayFilled,
  IconVideo,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useState } from "react";
import { useInterval } from "@mantine/hooks";

const INITIAL_TIME = {
  minute: 0,
  second: 0,
  milisecond: 0,
};

const formatOutput = (no: number): string => {
  return no.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const calculateTimeDifference = (
  currentTime: typeof INITIAL_TIME,
  lastLap: typeof INITIAL_TIME
) => {
  // Convert time objects to milliseconds
  const currentMs =
    currentTime.minute * 60 * 100 +
    currentTime.second * 100 +
    currentTime.milisecond;
  const lastLapMs =
    lastLap.minute * 60 * 100 + lastLap.second * 100 + lastLap.milisecond;

  // Calculate the difference in milliseconds
  const timeDifferenceMs = currentMs - lastLapMs;

  // Convert milliseconds to separate units (minutes, seconds, milliseconds)
  const minutes = Math.floor(timeDifferenceMs / (60 * 100));
  const remainingMs = timeDifferenceMs % (60 * 100);
  const seconds = Math.floor(remainingMs / 100);
  const milliseconds = remainingMs % 100;

  // Formats miliseconds to the length of 2, ex. 9778 => 97
  const formattedMillisecond = Number(String(milliseconds).slice(0, 2));

  return {
    minute: minutes,
    second: seconds,
    milisecond: formattedMillisecond,
  };
};

interface Props {
  withIAWrapper: boolean;
}

const IAStopwatch: React.FC<Props> = ({ withIAWrapper }) => {
  const [time, setTime] = useState<typeof INITIAL_TIME>(INITIAL_TIME);
  const [loops, setLoops] = useState<
    Array<{
      current: typeof INITIAL_TIME; // loop timestamp
      diff: typeof INITIAL_TIME; // Time from previous
    }>
  >([]);

  // Stopwatch logic
  const { active, start, stop } = useInterval(() => {
    setTime((prev) => {
      let newMilisecond = prev.milisecond + 1;
      let newSecond = prev.second;
      let newMinute = prev.minute;

      if (newMilisecond === 100) {
        newSecond += 1;
        newMilisecond = 0;
      }

      if (newSecond === 60) {
        newMinute += 1;
        newSecond = 0;
      }

      return {
        milisecond: newMilisecond,
        second: newSecond,
        minute: newMinute,
      };
    });
  }, 10);

  const handleReset = () => {
    stop();

    setTime(INITIAL_TIME);
    setLoops([]);
  };

  const handleLoop = () => {
    setLoops((prev) => [
      ...prev,
      {
        current: time,
        diff: !prev.length
          ? time
          : calculateTimeDifference(time, prev[prev.length - 1].current),
      },
    ]);
  };

  const stopwatchComponent = (
    <Center>
      <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
        <Flex align="flex-start" justify="space-between" direction="row">
          <Flex align="center" justify="space-between" direction="row">
            <RingProgress
              size={120}
              thickness={8}
              roundCaps
              sections={[]}
              label={
                <Center className={classes.action_button}>
                  <ActionIcon
                    color={active ? "red" : "teal"}
                    variant="light"
                    radius="50%"
                    size={70}
                    onClick={active ? stop : start}
                  >
                    {active ? (
                      <IconPlayerPauseFilled
                        style={getIconStyle(32)}
                        stroke={5}
                      />
                    ) : (
                      <IconPlayerPlayFilled
                        style={getIconStyle(32)}
                        stroke={5}
                      />
                    )}
                  </ActionIcon>
                </Center>
              }
            />

            <Flex align="flex-end">
              <Text fz={42}>{formatOutput(time.minute)}</Text>
              <Text fz={24} c="dimmed" ml={2} mb={6}>
                :{formatOutput(time.second)}.
              </Text>
              <Text fz={24} c="dimmed" ml={2} mb={6}>
                {formatOutput(time.milisecond)}
              </Text>
            </Flex>
          </Flex>

          <Flex
            align="flex-end"
            justify="space-between"
            direction="column"
            gap="md"
            mt={48}
          >
            <Flex
              align="flex-start"
              justify="space-between"
              direction="column"
              gap="xs"
            >
              {[...loops].reverse().map((loop, i) => (
                <Flex
                  key={i}
                  w="100%"
                  align="center"
                  justify="space-between"
                  gap="md"
                >
                  <Text size="sm" c="dimmed">
                    {loops.length - i}.
                  </Text>

                  <Text size="xs" c="dimmed">{`+ ${formatOutput(
                    loop.diff.minute
                  )}:${formatOutput(loop.diff.second)}.${formatOutput(
                    loop.diff.milisecond
                  )}`}</Text>

                  <Text size="md">{`${formatOutput(
                    loop.current.minute
                  )}:${formatOutput(loop.current.second)}.${formatOutput(
                    loop.current.milisecond
                  )}`}</Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>

        {/* Action buttons */}
        <Button
          className={classes.reset_btn}
          size="xs"
          variant="default"
          onClick={handleReset}
        >
          Reset
        </Button>

        <Button
          className={classes.lap_btn}
          size="xs"
          variant="default"
          onClick={handleLoop}
          disabled={!active}
        >
          Lap
        </Button>
      </Paper>
    </Center>
  );

  if (withIAWrapper) return <IAWrapper>{stopwatchComponent}</IAWrapper>;

  return stopwatchComponent;
};

export default IAStopwatch;
