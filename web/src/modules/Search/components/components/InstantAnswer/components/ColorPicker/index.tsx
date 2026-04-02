import { ColorPicker, Flex, TextInput } from '@mantine/core';

import { IAWrapper } from '../../wrapper';
import { useState } from 'react';

import classes from './styles.module.scss';
import { cp_hexToRgb, cp_rgbToHex } from './utils';

interface Props {
  withIAWrapper?: boolean;
}

const IAColorPicker: React.FC<Props> = ({ withIAWrapper }) => {
  const [hexValue, setHexValue] = useState('#fa5252');
  const [rgbValue, setRgbValue] = useState('250, 82, 82');

  const handleChangeHEXValue = (val: string) => {
    setHexValue(val);
  };

  const handleChangeRGBValue = (val: string) => {
    setRgbValue(val);
  };

  const handleBlur = (type: 'hex' | 'rgb') => {
    switch (type) {
      // Update RGB when HEX changes
      case 'hex':
        const rgbVal = cp_hexToRgb(hexValue);
        if (rgbVal) setRgbValue(`${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}`);
        break;

      // Update HEX when RGB changes
      case 'rgb':
        const rgb = rgbValue.split(', ');
        if (rgb.length !== 3) return;

        const hexVal = cp_rgbToHex({
          r: parseInt(rgb[0]),
          g: parseInt(rgb[1]),
          b: parseInt(rgb[2]),
        });

        if (hexVal) setHexValue(hexVal);
        break;

      default:
        break;
    }
  };

  const colorPickerComponent = (
    <Flex className={classes.color_picker_container} direction='column'>
      <Flex className={classes.cp_row} align='center' gap='sm' mt='md'>
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

            setHexValue(hexVal);
            if (rgbVal) setRgbValue(`${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}`);
          }}
          format='hex'
          size='xl'
          fullWidth
        />
      </Flex>

      <Flex className={classes.cp_row} align='center' gap='sm' mt='md'>
        <TextInput
          w='100%'
          label='HEX'
          value={hexValue}
          onChange={(e) => handleChangeHEXValue(e.currentTarget.value)}
          onBlur={() => handleBlur('hex')}
        />
        <TextInput
          w='100%'
          label='RGB'
          value={rgbValue}
          onChange={(e) => handleChangeRGBValue(e.currentTarget.value)}
          onBlur={() => handleBlur('rgb')}
        />
      </Flex>
    </Flex>
  );

  if (withIAWrapper) return <IAWrapper>{colorPickerComponent}</IAWrapper>;

  return colorPickerComponent;
};

export default IAColorPicker;
