import React, { useState } from "react";
import { IAWrapper } from "../../wrapper";
import { Center, Flex, Grid, Paper, useMantineTheme } from "@mantine/core";
import clsx from "clsx";

import classes from "./styles.module.scss";
import { cryptoRandomNumber } from "@utils/functions/cryptoRandomNumber";
import { IconCircleFilled } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

type IFaces = "front" | "back" | "right" | "left" | "top" | "bottom";

interface Props {
  withIAWrapper: boolean;
}

const IADiceRoll: React.FC<Props> = ({ withIAWrapper }) => {
  const [winner, setWinner] = useState<IFaces>("front");

  const theme = useMantineTheme();

  const handleRoll = () => {
    const faces: IFaces[] = ["front", "back", "right", "left", "top", "bottom"];

    let randomFace: IFaces;

    // Don't pick the same face twice in a row
    while (true) {
      const landedOn = cryptoRandomNumber(0, 5);
      randomFace = faces[landedOn];

      if (randomFace !== winner) {
        break;
      }
    }

    setWinner(randomFace);
  };

  const diceRollComponent = (
    <Center
      className={classes.dice_wrapper}
      onClick={() => {
        handleRoll();
      }}
    >
      <div className={clsx(classes.dice, classes[`show_${winner}`])}>
        <Paper withBorder className={clsx(classes.dice_face, classes.face_front)}>
          <Center h="100%">
            <IconCircleFilled style={getIconStyle(36)} color={theme.colors.red[6]} />
          </Center>
        </Paper>
        <Paper withBorder className={clsx(classes.dice_face, classes.face_back)}>
          <Center h="100%">
            <Flex wrap="wrap" w={60} gap={12}>
              <IconCircleFilled style={getIconStyle(24)} />
              <IconCircleFilled style={getIconStyle(24)} />
              <IconCircleFilled style={getIconStyle(24)} />
              <IconCircleFilled style={getIconStyle(24)} />
              <IconCircleFilled style={getIconStyle(24)} />
              <IconCircleFilled style={getIconStyle(24)} />
            </Flex>
          </Center>
        </Paper>
        <Paper withBorder className={clsx(classes.dice_face, classes.face_right)}>
          <Center h="100%">
            <Flex direction="column">
              <Flex wrap="wrap" w={72} gap={24} justify="flex-end">
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
              <Flex wrap="wrap" w={72} gap={24} mt={24}>
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
            </Flex>
          </Center>
        </Paper>
        <Paper withBorder className={clsx(classes.dice_face, classes.face_left)}>
          <Center h="100%">
            <Flex direction="column">
              <Flex wrap="wrap" w={72} gap={24}>
                <IconCircleFilled style={getIconStyle(24)} />
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
              <Flex wrap="wrap" w={72} gap={24} justify="center" my={6}>
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
              <Flex wrap="wrap" w={72} gap={24}>
                <IconCircleFilled style={getIconStyle(24)} />
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
            </Flex>
          </Center>
        </Paper>
        <Paper withBorder className={clsx(classes.dice_face, classes.face_top)}>
          <Center h="100%">
            <Flex direction="column">
              <Flex wrap="wrap" w={72} gap={24} justify="flex-end">
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
              <Flex wrap="wrap" w={72} gap={24} my={6} justify="center">
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>

              <Flex wrap="wrap" w={72} gap={24}>
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
            </Flex>
          </Center>
        </Paper>
        <Paper withBorder className={clsx(classes.dice_face, classes.face_bottom)}>
          <Center h="100%">
            <Flex direction="column">
              <Flex wrap="wrap" w={72} gap={24}>
                <IconCircleFilled style={getIconStyle(24)} />
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
              <Flex wrap="wrap" w={72} gap={24} mt={24}>
                <IconCircleFilled style={getIconStyle(24)} />
                <IconCircleFilled style={getIconStyle(24)} />
              </Flex>
            </Flex>
          </Center>
        </Paper>
      </div>
    </Center>
  );

  if (withIAWrapper) return <IAWrapper>{diceRollComponent}</IAWrapper>;

  return diceRollComponent;
};

export default IADiceRoll;
