import { Combobox, Flex, InputBase, useCombobox, useMantineTheme } from "@mantine/core";

import classes from "./styles.module.scss";
import commonClasses from "../../../common/styles.module.scss";

import type { ILanguage } from "@ts/global.types";
import { getIconStyle } from "@utils/functions/iconStyle";

import { useTranslate } from "@hooks/translate/use-translate";
import { setCookie } from "@utils/functions/cookies";

import { useClientServerState } from "@store/client-server";
import { IconBarrierBlock, IconBottle } from "@tabler/icons-react";
import { LANG_DATA } from "./data";

const LanguageSelect = () => {
  const { language, setLanguage } = useClientServerState();

  const t = useTranslate();

  const theme = useMantineTheme();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleChange = async (next: ILanguage) => {
    // Don't fetch/update context for no reason
    if (language === next) {
      combobox.closeDropdown();
      return;
    }

    // Set language in context
    setLanguage(next);

    // Set language in cookie ( for persistance )
    setCookie("khofly-language", next, {
      expires: 60 * 60 * 24 * 90, // ~ 90 days
      path: "/",
      domain: process.env.NODE_ENV === "development" ? "localhost" : "khofly.com",
      secure: process.env.HOST?.includes("https"),
      sameSite: "Strict",
    });

    combobox.closeDropdown();
  };

  const selected = LANG_DATA.find((l) => l.value === language) || LANG_DATA[1];

  const items = LANG_DATA.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <Flex align="center" gap="sm">
        <item.icon className={classes.flag_icon_sm} radius={1} />

        {t(item.label)}

        <div className="flex_1"></div>

        {item.isWip && (
          <IconBarrierBlock style={getIconStyle(16)} color={theme.colors.orange["5"]} />
        )}
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={(val) => handleChange(val as ILanguage)}>
      <Combobox.Target>
        <InputBase
          w={200}
          leftSection={<selected.icon className={classes.flag_icon_lg} radius={2} />}
          leftSectionWidth={27 + 20}
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
          placeholder="Language"
          value={t(selected.label)}
          classNames={{
            input: classes.combobox_cursor,
            root: commonClasses.settings_control,
          }}
          readOnly
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{items}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default LanguageSelect;
