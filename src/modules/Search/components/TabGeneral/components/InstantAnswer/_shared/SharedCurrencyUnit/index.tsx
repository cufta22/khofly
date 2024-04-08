import React from "react";
import { Tabs } from "@mantine/core";
import {
  IconCash,
  IconClock,
  IconHourglassLow,
  IconRuler,
  IconRuler2,
  IconRulerMeasure,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import Stopwatch from "../../Stopwatch";
import Timer from "../../Timer";
import { IAWrapper } from "../../wrapper";
import IAUnit, { UnitsType } from "../../Unit";
import IACurrency from "../../Currency";

interface Props {
  type: "currency" | "unit";

  unitType?: UnitsType;
  unit1?: string;
  unit2?: string;

  currency1?: string;
  currency2?: string;
}

const SharedCurrencyUnit: React.FC<Props> = ({
  type,
  currency1,
  currency2,
  unit1,
  unit2,
  unitType,
}) => {
  return (
    <IAWrapper>
      <Tabs defaultValue={type} mt={-16}>
        <Tabs.List grow mb="lg">
          <Tabs.Tab
            value="currency"
            leftSection={<IconCash style={getIconStyle(20)} />}
            disabled
          >
            Currency
          </Tabs.Tab>
          <Tabs.Tab
            value="unit"
            leftSection={<IconRulerMeasure style={getIconStyle(20)} />}
          >
            Unit
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="currency">
          <IACurrency
            withIAWrapper={false}
            currency1={currency1!}
            currency2={currency2!}
          />
        </Tabs.Panel>

        <Tabs.Panel value="unit">
          <IAUnit
            withIAWrapper={false}
            type={unitType!}
            unit1={unit1!}
            unit2={unit2!}
          />
        </Tabs.Panel>
      </Tabs>
    </IAWrapper>
  );
};

export default SharedCurrencyUnit;
