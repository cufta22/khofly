import { Combobox, Flex, InputBase, useCombobox } from "@mantine/core";

import classes from "./styles.module.scss";
import commonClasses from "../../../common/styles.module.scss";

import type { DotNestedKeys, ILanguage, ITranslations } from "@ts/global.types";
import { getIconStyle } from "@utils/functions/iconStyle";

import { useTranslate } from "@hooks/translate/use-translate";
import { setCookie } from "@utils/functions/cookies";

import { useClientServerState } from "@store/client-server";
import type { FlagProps } from "@components/Icons/types";
import { GBFlag } from "@components/Icons/Flags";

interface ILangData {
  label: DotNestedKeys<ITranslations>;
  value: string;
  icon: React.FC<FlagProps>;
}

const LANG_DATA: ILangData[] = [
  {
    label: "pages.settings.interface.select_lang_options.en",
    value: "en",
    icon: GBFlag, // USFlag | GBFlag
  },
  // {
  //   label: "pages.settings.interface.select_lang_options.de",
  //   value: "de",
  //   icon: DEFlag,
  // },
];

const LanguageSelect = () => {
  const { language, setLanguage } = useClientServerState();

  const t = useTranslate();

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
        <item.icon style={getIconStyle(22)} className={classes.flag_icon} radius={1} />

        {t(item.label)}
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={(val) => handleChange(val as ILanguage)}>
      <Combobox.Target>
        <InputBase
          w={200}
          leftSection={
            <selected.icon style={getIconStyle(25)} className={classes.flag_icon} radius={2} />
          }
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
