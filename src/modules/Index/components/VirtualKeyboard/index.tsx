import { ActionIcon, CloseButton, Flex, Paper, Text, rem } from "@mantine/core";
import React, { useRef, useState } from "react";

import classes from "./styles.module.scss";
import { useDrag } from "@hooks/use-drag";
import {
  IconArrowBadgeUp,
  IconBackspace,
  IconChevronsUp,
  IconSun,
} from "@tabler/icons-react";
import { IKeyboard, KEYBOARD_EN_US } from "@utils/resources/keyboards";
import clsx from "clsx";

interface Props {
  value: string;
  onChange: (val: string) => void;
  toggle: () => void;
}

type TypeRGB = "off" | "red" | "green" | "blue" | "auto";

const VirtualKeyboard: React.FC<Props> = ({ value, onChange, toggle }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [isShift, setShift] = useState(false);
  const [isCapsLock, setCapsLock] = useState(false);
  const [isFN, setFN] = useState(false);

  const [isRGB, setRGB] = useState<TypeRGB>("off");

  const divW = 550;
  const divH = 250;
  const keyGap = 6;
  const keySize = 30;

  const pos = useDrag(divRef, divW, divH);

  const currentKeyboard: IKeyboard = KEYBOARD_EN_US;
  const shiftExt = isShift || isCapsLock ? "shift" : "normal";

  const handleButtonClick = (letter: string) => {
    if (letter === "fn" && !isFN) return setFN(true);
    if (letter === "fn" && isFN) return setFN(false);

    // Handle FN - RGB
    if (letter === "space" && isFN) {
      const rgbOpts = ["off", "red", "green", "blue", "auto"] as TypeRGB[];
      const current = rgbOpts.findIndex((v) => v === isRGB);

      setFN(false);
      return setRGB(rgbOpts[current === rgbOpts.length - 1 ? 0 : current + 1]);
    }

    if (letter === "shift" && !isShift) return setShift(true);
    if (letter === "shift" && isShift) return setShift(false);
    if (letter === "caps-lock" && !isCapsLock) return setCapsLock(true);
    if (letter === "caps-lock" && isCapsLock) return setCapsLock(false);

    if (letter === "space") return onChange(value + " ");
    if (letter === "ctrl-alt") return onChange(value + "?");
    if (letter === "delete")
      return onChange(value.substring(0, value.length - 1));

    // Reset keys
    setFN(false);
    setShift(false);

    onChange(value + letter);
  };

  return (
    <Paper
      ref={divRef}
      withBorder
      px="sm"
      className={classes.virtual_keyboard}
      style={{
        position: "absolute",
        width: rem(divW),
        height: rem(divH),
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <Flex
        id="drag-handle"
        className={classes.draggable}
        align="center"
        justify="space-between"
        mb="lg"
        pt="xs"
      >
        <Text>QWERTY Keyboard</Text>

        <CloseButton onClick={toggle} />
      </Flex>

      {/* Row 1 */}
      <Flex align="center" justify="flex-start" gap={keyGap} mb={keyGap}>
        {currentKeyboard[`row_1_${shiftExt}`].map((item, i) => (
          <ActionIcon
            key={item}
            size={keySize}
            className={clsx(
              { [classes.flex_grow]: item === "delete" },
              { [classes.rgb_red]: isRGB === "red" },
              { [classes.rgb_green]: isRGB === "green" },
              { [classes.rgb_blue]: isRGB === "blue" },
              { [classes.rgb_auto]: isRGB === "auto" }
            )}
            variant="default"
            onClick={() => handleButtonClick(item)}
          >
            {item === "delete" ? <IconBackspace stroke={1.5} /> : item}
          </ActionIcon>
        ))}
      </Flex>

      {/* Row 2 */}
      <Flex
        align="center"
        justify="flex-start"
        pl={keySize + keyGap + 6}
        gap={keyGap}
        mb={keyGap}
      >
        {currentKeyboard[`row_2_${shiftExt}`].map((item, i) => (
          <ActionIcon
            key={item}
            size={keySize}
            className={clsx(
              { [classes.rgb_red]: isRGB === "red" },
              { [classes.rgb_green]: isRGB === "green" },
              { [classes.rgb_blue]: isRGB === "blue" },
              { [classes.rgb_auto]: isRGB === "auto" }
            )}
            variant="default"
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </ActionIcon>
        ))}
      </Flex>

      {/* Row 3 */}
      <Flex align="center" justify="flex-start" gap={keyGap} mb={keyGap}>
        {currentKeyboard[`row_3_${shiftExt}`].map((item, i) => (
          <ActionIcon
            key={item}
            size={keySize}
            className={clsx(
              { [classes.flex_lg]: item === "caps-lock" },
              { [classes.rgb_red]: isRGB === "red" },
              { [classes.rgb_green]: isRGB === "green" },
              { [classes.rgb_blue]: isRGB === "blue" },
              { [classes.rgb_auto]: isRGB === "auto" }
            )}
            variant={isCapsLock && item === "caps-lock" ? "filled" : "default"}
            onClick={() => handleButtonClick(item)}
            color={
              isRGB === "red"
                ? "red"
                : isRGB === "blue"
                ? "blue"
                : isRGB === "green"
                ? "green"
                : "blue"
            }
          >
            {item === "caps-lock" ? <IconChevronsUp stroke={1.5} /> : item}
          </ActionIcon>
        ))}
      </Flex>

      {/* Row 4 */}
      <Flex align="center" justify="flex-start" gap={keyGap} mb={keyGap}>
        {currentKeyboard[`row_4_${shiftExt}`].map((item, i) => (
          <ActionIcon
            key={i}
            size={keySize}
            className={clsx(
              { [classes.flex_grow]: item === "shift" },
              { [classes.rgb_red]: isRGB === "red" },
              { [classes.rgb_green]: isRGB === "green" },
              { [classes.rgb_blue]: isRGB === "blue" },
              { [classes.rgb_auto]: isRGB === "auto" }
            )}
            variant={isShift && item === "shift" ? "filled" : "default"}
            onClick={() => handleButtonClick(item)}
            color={
              isRGB === "red"
                ? "red"
                : isRGB === "blue"
                ? "blue"
                : isRGB === "green"
                ? "green"
                : "blue"
            }
          >
            {item === "shift" ? <IconArrowBadgeUp stroke={1.5} /> : item}
          </ActionIcon>
        ))}
      </Flex>

      {/* Row 5 */}
      <Flex align="center" justify="flex-start" gap={keyGap} mb={keyGap}>
        {currentKeyboard.row_5_normal.map((item, i) => (
          <ActionIcon
            key={i}
            size={keySize}
            className={clsx(
              { [classes.flex_grow]: item === "space" },
              { [classes.space_align]: item === "space" },
              { [classes.flex_xl]: item === "ctrl-alt" },
              { [classes.rgb_red]: isRGB === "red" },
              { [classes.rgb_green]: isRGB === "green" },
              { [classes.rgb_blue]: isRGB === "blue" },
              { [classes.rgb_auto]: isRGB === "auto" }
            )}
            variant={isFN && item === "fn" ? "filled" : "default"}
            onClick={() => handleButtonClick(item)}
            color={
              isRGB === "red"
                ? "red"
                : isRGB === "blue"
                ? "blue"
                : isRGB === "green"
                ? "green"
                : "blue"
            }
          >
            {item === "space" ? (
              <IconSun size={18} stroke={1.5} />
            ) : item === "ctrl-alt" ? (
              "ctrl + alt"
            ) : (
              "Fn"
            )}
          </ActionIcon>
        ))}
      </Flex>
    </Paper>
  );
};

export default VirtualKeyboard;
