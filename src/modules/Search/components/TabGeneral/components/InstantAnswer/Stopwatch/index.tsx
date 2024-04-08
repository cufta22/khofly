import { ActionIcon, Button, Center, Flex, Paper, Text } from "@mantine/core";
import { IAWrapper } from "../wrapper";
import classes from "./styles.module.scss";
import {
  IconPlayerPlay,
  IconPlayerPlayFilled,
  IconVideo,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useState } from "react";

const formatOutput = (no: number) => {
  return no.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const INITIAL_TIME = {
  hour: 0,
  minute: 0,
  second: 10,
};

interface Props {
  withIAWrapper: boolean;
}

const IAStopwatch: React.FC<Props> = ({ withIAWrapper }) => {
  const [time, setTime] = useState(INITIAL_TIME);

  const handleReset = () => {};

  const handleLoop = () => {};

  const stopwatchComponent = (
    <Center>
      <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
        <Flex align="flex-start" justify="space-between" direction="row">
          <Flex align="center" justify="space-between" direction="row">
            <ActionIcon
              color="teal"
              m={10}
              variant="light"
              radius={50}
              size={100}
            >
              <IconPlayerPlayFilled style={getIconStyle(50)} stroke={5} />
            </ActionIcon>
            <Flex align="flex-end">
              <Text fz={42}>{formatOutput(time.hour)}:</Text>
              <Text fz={42}>{formatOutput(time.minute)}</Text>
              <Text fz={24} c="dimmed" ml={2} mb={6}>
                {formatOutput(time.second)}
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
