import {
  Button,
  Center,
  Flex,
  NumberInput,
  Paper,
  Text,
  Transition,
} from "@mantine/core";
import { IAWrapper } from "../../wrapper";
import classes from "./styles.module.scss";
import { useState } from "react";

const IARNG = () => {
  const [rn, setRn] = useState<number>(0);
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(10);

  const handleGenerate = () => {
    let minNo = min > max ? max : min;
    let maxNo = min > max ? min : max;

    // Generate a random number between min (inclusive) and max (inclusive)
    const randomNo = Math.floor(Math.random() * (maxNo - minNo + 1)) + minNo;

    setRn(randomNo);
  };

  return (
    <IAWrapper>
      <Center>
        <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
          <Flex align="flex-start" justify="space-between" direction="column">
            <Text fz={30} fw={600}>
              {rn}
            </Text>

            <Flex gap="md" mt="md">
              <NumberInput
                label="Min"
                value={min}
                onChange={(val) => setMin(Number(val))}
              />

              <NumberInput
                label="Max"
                value={max}
                onChange={(val) => setMax(Number(val))}
              />
            </Flex>

            <Button mt="md" onClick={handleGenerate}>
              Generate
            </Button>
          </Flex>
        </Paper>
      </Center>
    </IAWrapper>
  );
};

export default IARNG;
