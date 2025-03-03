import React, { useState } from "react";
import { Space, Tabs } from "@mantine/core";
import { IconCircle, IconClock, IconDice, IconHourglassLow, IconTicTac } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import { IAWrapper } from "../../wrapper";

import CoinFilp from "../../components/CoinFilp";
import DiceRoll from "../../components/DiceRoll";
import TicTacToe from "../../components/TicTacToe";

type IGames = "coinflip" | "diceroll" | "tictactoe";

interface Props {
  type: IGames;
}

const SharedGames: React.FC<Props> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<IGames>(type);

  return (
    <IAWrapper>
      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab((val as IGames) || "coinflip")}
        mt={-16}
        keepMounted
      >
        <Tabs.List grow mb="lg">
          <Tabs.Tab value="coinflip" leftSection={<IconCircle style={getIconStyle(20)} />}>
            Coin Flip
          </Tabs.Tab>
          <Tabs.Tab value="diceroll" leftSection={<IconDice style={getIconStyle(20)} />}>
            Dice Roll
          </Tabs.Tab>
          <Tabs.Tab value="tictactoe" leftSection={<IconTicTac style={getIconStyle(20)} />}>
            TicTacToe
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="coinflip">
          <Space h={40} />
          <CoinFilp withIAWrapper={false} />
          <Space h={40} />
        </Tabs.Panel>

        <Tabs.Panel value="diceroll">
          <Space h={40} />
          <DiceRoll withIAWrapper={false} />
          <Space h={40} />
        </Tabs.Panel>

        <Tabs.Panel value="tictactoe">
          <TicTacToe withIAWrapper={false} />
        </Tabs.Panel>
      </Tabs>
    </IAWrapper>
  );
};

export default SharedGames;
