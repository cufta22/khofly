import { useState } from "react";
import { IAWrapper } from "../../wrapper";
import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Paper,
  Popover,
  Text,
  Transition,
} from "@mantine/core";

import { BTN_VALUES } from "./data";
import { calculate } from "./utils";
import { useWindowEvent } from "@mantine/hooks";
import { IconCalculator, IconEqual, IconHistory } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { handlePress } from "./handlePress";

const WIP_BUTTONS = ["deg", "rad", "2nd", "ln", "square_root", "pi", "x!", "e"];

const IACalculator = () => {
  // Calculator state
  const [equation, setEquation] = useState<string>("0");
  const [result, setResult] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<
    { equation: string; result: string }[]
  >([]);

  const [variant, setVariant] = useState<"basic" | "scientific">("basic");

  // Handle keypress
  useWindowEvent("keydown", (e) => {
    return handlePress({
      equation,
      history,
      result,
      setEquation,
      setHistory,
      setResult,
      setVariant,
      variant,
      // Handle result
      btn:
        e.key === "Enter"
          ? "equals"
          : // Handle backspace
          e.key === "Backspace"
          ? "backspace"
          : e.key,
    });
  });

  return (
    <IAWrapper>
      <Paper p="xs" w="100%" h={100} pos="relative">
        <Popover
          opened={historyOpen}
          onChange={setHistoryOpen}
          width={400}
          position="bottom-start"
          shadow="md"
        >
          <Popover.Target>
            <ActionIcon
              onClick={() => setHistoryOpen((o) => !o)}
              size="lg"
              variant="subtle"
              color="gray"
              pos="absolute"
            >
              <IconHistory style={getIconStyle(24)} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            {history.map((val, i) => (
              <Flex key={i} align="center" justify="flex-start" gap={4} my="xs">
                <Button
                  onClick={() => {
                    setEquation(val.equation);
                    setResult("");
                    setHistoryOpen(false);
                  }}
                  size="xs"
                  c="gray"
                  variant="outline"
                >
                  <Text size="xs" fw={600} truncate="end">
                    {val.equation}
                  </Text>
                </Button>

                <IconEqual style={getIconStyle(22)} stroke={1.5} />

                <Button
                  onClick={() => {
                    setEquation(val.result);
                    setResult("");
                    setHistoryOpen(false);
                  }}
                  size="xs"
                  c="gray"
                  variant="outline"
                >
                  <Text size="xs" fw={600} truncate="end">
                    {val.result}
                  </Text>
                </Button>
              </Flex>
            ))}
          </Popover.Dropdown>
        </Popover>

        <Flex h="100%" justify="flex-end" align="flex-end" direction="column">
          <Text
            c={!result.length ? "" : "dimmed"}
            // size={!result.length ? "xl" : "md"}
            fz={!result.length ? 30 : 16}
            fw={!result.length ? 600 : 400}
          >
            {equation}
          </Text>

          {/* Slide in result */}
          <Transition transition="pop" duration={300} mounted={!!result.length}>
            {(transitionStyles) => (
              <Text fz={30} fw={600} style={transitionStyles}>
                {result}
              </Text>
            )}
          </Transition>
        </Flex>
      </Paper>
      {/* Calculator keyboard */}
      {BTN_VALUES(variant).map((gridBtnRow, i) => (
        <Grid
          key={i}
          grow
          gutter="xs"
          mt="xs"
          styles={{ inner: { flexWrap: "nowrap" } }}
        >
          {gridBtnRow.map((gridBtn) => {
            if (gridBtn.variant === "scientific" && variant === "basic")
              return null;
            else
              return (
                <Grid.Col key={gridBtn.value} span={"auto"}>
                  <Button
                    w="100%"
                    color={gridBtn.color}
                    onClick={() =>
                      handlePress({
                        equation,
                        history,
                        result,
                        setEquation,
                        setHistory,
                        setResult,
                        setVariant,
                        variant,
                        btn: gridBtn.value,
                      })
                    }
                    disabled={WIP_BUTTONS.includes(gridBtn.value)}
                  >
                    {WIP_BUTTONS.includes(gridBtn.value) ? "" : gridBtn.label}
                  </Button>
                </Grid.Col>
              );
          })}
        </Grid>
      ))}
    </IAWrapper>
  );
};

export default IACalculator;
