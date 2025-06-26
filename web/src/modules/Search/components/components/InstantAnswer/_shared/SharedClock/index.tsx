import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import { IconClock, IconHourglassLow } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import { IAWrapper } from "../../wrapper";

import Stopwatch from "../../components/Stopwatch";
import Timer from "../../components/Timer";

interface Props {
  type: "stopwatch" | "timer";
}

const SharedClock: React.FC<Props> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<"stopwatch" | "timer">(type);

  return (
    <IAWrapper>
      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab((val as "stopwatch" | "timer") || "timer")}
        mt={-16}
      >
        <Tabs.List grow mb="lg">
          <Tabs.Tab
            value="stopwatch"
            leftSection={<IconClock style={getIconStyle(20)} />}
          >
            Stopwatch
          </Tabs.Tab>
          <Tabs.Tab
            value="timer"
            leftSection={<IconHourglassLow style={getIconStyle(20)} />}
          >
            Timer
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="stopwatch">
          <Stopwatch withIAWrapper={false} />
        </Tabs.Panel>

        <Tabs.Panel value="timer">
          <Timer withIAWrapper={false} />
        </Tabs.Panel>
      </Tabs>
    </IAWrapper>
  );
};

export default SharedClock;
