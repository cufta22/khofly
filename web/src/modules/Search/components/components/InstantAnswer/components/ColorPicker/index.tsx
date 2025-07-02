import { ColorPicker, Flex, TextInput } from "@mantine/core";

import { IAWrapper } from "../../wrapper";
import { useState } from "react";

import classes from "./styles.module.scss";
import { cp_hexToHsl, cp_hexToRgb } from "./utils";

interface Props {
  withIAWrapper?: boolean;
}

const IAColorPicker: React.FC<Props> = ({ withIAWrapper }) => {
  const [hexValue, setHexValue] = useState("#fa5252");
  const [rgbValue, setRgbValue] = useState("250, 82, 82");
  const [hslValue, setHslValue] = useState("0°, 94%, 65%");

  const handleChangeHEXValue = (val: string) => {
    setHexValue(val);
  };
  const handleChangeRGBValue = (val: string) => {
    setRgbValue(val);
  };
  const handleChangeHSLValue = (val: string) => {
    setHslValue(val);
  };

  const handleBlur = (type: "hex" | "rgb" | "hsv" | "hsl") => {};

  const colorPickerComponent = (
    <Flex className={classes.color_picker_container} direction="column">
      <Flex className={classes.cp_row} align="center" gap="sm" mt="md">
        <div className={classes.color_display}></div>

        <ColorPicker
          classNames={{
            // body: classes.cp_body,
            slider: classes.cp_slider_height,
          }}
          value={hexValue}
          onChange={(val) => {
            const hexVal = val;
            const rgbVal = cp_hexToRgb(val);
            const hslVal = cp_hexToHsl(val);

            setHexValue(hexVal);
            if (rgbVal) setRgbValue(`${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}`);
            if (hslVal) setHslValue(`${hslVal.h}°, ${hslVal.s}%, ${hslVal.l}%`);
          }}
          format="hex"
          size="xl"
          fullWidth
        />
      </Flex>

      <Flex className={classes.cp_row} align="center" gap="sm" mt="md">
        <TextInput
          w="100%"
          label="HEX"
          value={hexValue}
          onChange={(e) => handleChangeHEXValue(e.currentTarget.value)}
        />
        <TextInput
          w="100%"
          label="RGB"
          value={rgbValue}
          onChange={(e) => handleChangeRGBValue(e.currentTarget.value)}
        />
      </Flex>

      <Flex className={classes.cp_row} align="center" gap="sm" mt="md">
        <TextInput
          w="100%"
          label="HSL"
          value={hslValue}
          onChange={(e) => handleChangeHSLValue(e.currentTarget.value)}
        />
      </Flex>
    </Flex>
  );

  if (withIAWrapper) return <IAWrapper>{colorPickerComponent}</IAWrapper>;

  return colorPickerComponent;
};

export default IAColorPicker;
