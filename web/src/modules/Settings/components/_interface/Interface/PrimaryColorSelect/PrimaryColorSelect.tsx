import {
  ColorSwatch,
  Combobox,
  Flex,
  InputBase,
  ScrollArea,
  useCombobox,
  useMantineTheme,
  type MantineColor,
} from "@mantine/core";
import classes from "./styles.module.scss";

import type { IAppTheme } from "@ts/global.types";

import { useTranslate } from "@hooks/translate/use-translate";
import { setCookie } from "@utils/functions/cookies";
import { useClientServerState } from "@store/client-server";
import { COLORS_DATA, type IColorData } from "./utils";

const PrimaryColorSelect = () => {
  const { primaryColor, setPrimaryColor } = useClientServerState();

  const t = useTranslate();

  const theme = useMantineTheme();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selected: IColorData = COLORS_DATA.find((l) => l.value === primaryColor) || {
    label: "pages.settings.interface.select_primary_color_options.blue",
    value: "blue",
  };

  const handleChange = (next: MantineColor) => {
    // Don't update context for no reason
    if (primaryColor === next) {
      combobox.closeDropdown();
      return;
    }

    // Set theme in context
    setPrimaryColor(next);

    // Set theme in cookie ( for persistance )
    setCookie("khofly-primary-color", next, {
      expires: 60 * 60 * 24 * 90, // ~ 90 days
      path: "/",
      domain: process.env.NODE_ENV === "development" ? "localhost" : "khofly.com",
      secure: process.env.HOST?.includes("https"),
      sameSite: "Strict",
    });

    combobox.closeDropdown();
  };

  const items = COLORS_DATA.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <Flex align="center" gap="sm">
        <ColorSwatch color={theme.colors[item.value][6]} size={16} />

        {t(item.label)}
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={(val) => handleChange(val as IAppTheme)}>
      <Combobox.Target>
        <InputBase
          w={200}
          leftSection={
            <ColorSwatch color={theme.colors[selected.value][6]} size={20} />
            // <Image src={selected.image} w={20} h={20} alt={`${selected.label} logo`} />
          }
          leftSectionWidth={25 + 20}
          leftSectionProps={{
            onClick: () => combobox.openDropdown(),
            className: classes.combobox_cursor,
          }}
          rightSection={<Combobox.Chevron />}
          rightSectionProps={{
            onClick: () => combobox.openDropdown(),
            className: classes.combobox_cursor,
          }}
          onClick={() => combobox.openDropdown()}
          placeholder="Color"
          value={t(selected.label)}
          classNames={{
            input: classes.combobox_cursor,
          }}
          readOnly
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={300}>
            {items}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default PrimaryColorSelect;
