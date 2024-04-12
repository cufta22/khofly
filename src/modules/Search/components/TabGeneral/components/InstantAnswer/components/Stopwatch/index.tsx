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

const formatOutput = (no: number) => {
  return no.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const INITIAL_TIME = {
  minute: 0,
  second: 0,
  milisecond: 0,
};

interface Props {
  withIAWrapper: boolean;
}

const IAStopwatch: React.FC<Props> = ({ withIAWrapper }) => {
  const [time, setTime] = useState(INITIAL_TIME);

  // Timer logic
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
    setTime(INITIAL_TIME);
    stop();
  };

  const handleLoop = () => {};

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
          >
            <Flex
              align="flex-start"
              justify="space-between"
              direction="row"
              gap="md"
            >
              <Button size="xs" variant="default" onClick={handleReset}>
                Reset
              </Button>

              <Button size="xs" variant="default" onClick={handleLoop}>
                Loop
              </Button>
            </Flex>

            <Flex
              align="flex-start"
              justify="space-between"
              direction="column"
              mt="sm"
              gap="xs"
            >
              <Text>1. 01:23.23</Text>
              <Text>2. 01:23.23</Text>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Center>
  );

  if (withIAWrapper) return <IAWrapper>{stopwatchComponent}</IAWrapper>;

  return stopwatchComponent;
};

export default IAStopwatch;
