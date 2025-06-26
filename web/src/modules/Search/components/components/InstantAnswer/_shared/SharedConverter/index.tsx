import React, { useState } from "react";
import { Anchor, Tabs, Text } from "@mantine/core";
import { IconCash, IconRulerMeasure } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import { IAWrapper } from "../../wrapper";
import IAUnit, { UnitsType } from "../../components/Unit";
import IACurrency from "../../components/Currency";
import { usePrimaryColor } from "@hooks/use-primary-color";

interface Props {
  type: "currency" | "unit";

  unitType?: UnitsType;
  unit1?: string;
  unit2?: string;

  currency1?: string;
  currency2?: string;
}

const SharedConverter: React.FC<Props> = ({
  type,
  currency1,
  currency2,
  unit1,
  unit2,
  unitType,
}) => {
  const [activeTab, setActiveTab] = useState<"currency" | "unit">(type);

  const linkTextColor = usePrimaryColor(4);

  return (
    <IAWrapper
      label={
        activeTab === "currency" ? (
          <Text size="sm" c="dimmed">
            Data provided by{" "}
            <Anchor href="https://openexchangerates.com/" rel="noreferrer noopener">
              <Text component="span" c={linkTextColor}>
                Open Exchange Rates
              </Text>
            </Anchor>
          </Text>
        ) : undefined
      }
    >
      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab((val as "currency" | "unit") || "unit")}
        mt={-16}
      >
        <Tabs.List grow mb="lg">
          <Tabs.Tab value="currency" leftSection={<IconCash style={getIconStyle(20)} />}>
            Currency
          </Tabs.Tab>
          <Tabs.Tab value="unit" leftSection={<IconRulerMeasure style={getIconStyle(20)} />}>
            Unit
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="currency">
          <IACurrency
            withIAWrapper={false}
            currency1={currency1 || "USD"}
            currency2={currency2 || "EUR"}
          />
        </Tabs.Panel>

        <Tabs.Panel value="unit">
          <IAUnit
            withIAWrapper={false}
            type={unitType || "length"}
            unit1={unit1 || "m"}
            unit2={unit2 || "cm"}
          />
        </Tabs.Panel>
      </Tabs>
    </IAWrapper>
  );
};

export default SharedConverter;
