import { IAWrapper } from "../../wrapper";
import {
  ActionIcon,
  Center,
  Flex,
  NumberInput,
  Paper,
  ScrollArea,
  SegmentedControl,
  Select,
} from "@mantine/core";

import classes from "./styles.module.scss";
import { IconSwitchHorizontal } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { convertUnit } from "./utils";
import {
  KEYWORDS_UNITS_ALL_MAP,
  KEYWORDS_UNITS_ANGLE,
  KEYWORDS_UNITS_AREA,
  KEYWORDS_UNITS_LENGTH,
  KEYWORDS_UNITS_MASS,
  KEYWORDS_UNITS_TEMPERATURE,
  KEYWORDS_UNITS_TIME,
  KEYWORDS_UNITS_VOLUME,
} from "../../_utils/keywords_units";

const TYPE_TO_UNITS = {
  length: KEYWORDS_UNITS_LENGTH,
  area: KEYWORDS_UNITS_AREA,
  volume: KEYWORDS_UNITS_VOLUME,
  angle: KEYWORDS_UNITS_ANGLE,
  time: KEYWORDS_UNITS_TIME,
  mass: KEYWORDS_UNITS_MASS,
  temperature: KEYWORDS_UNITS_TEMPERATURE,
};

export type UnitsType =
  | "length"
  | "area"
  | "volume"
  | "angle"
  | "time"
  | "mass"
  | "temperature";

interface Props {
  withIAWrapper: boolean;
  type: UnitsType;
  unit1: string;
  unit2: string;
}

const IAUnit: React.FC<Props> = ({ withIAWrapper, type, unit1, unit2 }) => {
  const [state, setState] = useState({
    input: 1,
    result: 0,
    fromUnit: unit1,
    toUnit: unit2,
    type: type,
  });

  const handleChangeInput = (val: string | number) => {
    const numVal = typeof val === "number" ? val : parseFloat(val);
    const res = convertUnit(numVal, state.fromUnit, state.toUnit, state.type);

    setState((s) => ({ ...s, input: numVal, result: res }));
  };

  const handleChangeUnit = (val: string, field: "fromUnit" | "toUnit") => {
    const res = convertUnit(
      state.input,
      field === "fromUnit" ? val : state.fromUnit,
      field === "toUnit" ? val : state.toUnit,
      state.type
    );

    setState((s) => ({ ...s, [field]: val, result: res }));
  };

  const handleChangeType = (val: UnitsType) => {
    const newFrom = KEYWORDS_UNITS_ALL_MAP[val].array[0];
    const newTo = KEYWORDS_UNITS_ALL_MAP[val].array[1];
    console.log(newTo);

    const res = convertUnit(1, newFrom, newTo, val);

    setState({
      input: 1,
      result: res,
      fromUnit: newFrom,
      toUnit: newTo,
      type: val,
    });
  };

  const handleSwapUnits = () => {
    const res = convertUnit(
      state.input,
      state.toUnit,
      state.fromUnit,
      state.type
    );

    setState((s) => ({
      ...s,
      result: res,
      fromUnit: s.toUnit,
      toUnit: s.fromUnit,
    }));
  };

  useEffect(() => {
    const res = convertUnit(state.input, state.fromUnit, state.toUnit, type);
    setState((s) => ({ ...s, result: res }));
  }, []);

  const unitComponent = (
    <Center>
      <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
        <ScrollArea type="never">
          <SegmentedControl
            fullWidth
            mb="md"
            value={state.type}
            onChange={(val) => val && handleChangeType(val as UnitsType)}
            data={Object.keys(KEYWORDS_UNITS_ALL_MAP).map((val) => ({
              label: val,
              value: val,
            }))}
          />
        </ScrollArea>

        <Flex align="flex-end" gap="md">
          <Flex gap="md" direction="column">
            <NumberInput
              value={state.input}
              onChange={handleChangeInput}
              rightSection={<></>}
              rightSectionWidth={0}
            />

            <Select
              withCheckIcon={false}
              value={state.fromUnit}
              onChange={(val) => val && handleChangeUnit(val, "fromUnit")}
              data={TYPE_TO_UNITS[state.type].map((val) => ({
                value: val,
                label: val,
              }))}
            />
          </Flex>

          <ActionIcon
            style={{ flexGrow: 1 }}
            variant="subtle"
            onClick={handleSwapUnits}
            mb={4}
          >
            <IconSwitchHorizontal />
          </ActionIcon>

          <Flex gap="md" direction="column">
            <NumberInput
              value={state.result}
              rightSection={<></>}
              rightSectionWidth={0}
              readOnly
            />

            <Select
              withCheckIcon={false}
              value={state.toUnit}
              onChange={(val) => val && handleChangeUnit(val, "toUnit")}
              data={TYPE_TO_UNITS[state.type].map((val) => ({
                value: val,
                label: val,
              }))}
            />
          </Flex>
        </Flex>
      </Paper>
    </Center>
  );

  if (withIAWrapper) return <IAWrapper>{unitComponent}</IAWrapper>;

  return unitComponent;
};

export default IAUnit;