import { Combobox, Image, InputBase, useCombobox } from "@mantine/core";
import classes from "./styles.module.scss";

import { DotNestedKeys, IAppTheme, ITranslations } from "@ts/global.types";

import { useTranslate } from "@hooks/translate/use-translate";
import { setCookie } from "@utils/functions/cookies";
import { useClientServerState } from "@store/client-server";

interface ILangData {
  label: DotNestedKeys<ITranslations>;
  value: IAppTheme;
  image: string;
}

const THEME_DATA: ILangData[] = [
  {
    label: "pages.settings.interface.select_theme_options.mantine_old",
    value: "Mantine-Old",
    image: "/assets/mantine.png",
  },
  {
    label: "pages.settings.interface.select_theme_options.mantine_new",
    value: "Mantine-New",
    image: "/assets/mantine.png",
  },
  {
    label: "pages.settings.interface.select_theme_options.catppuccin",
    value: "Catppuccin-Mocha",
    image: "/assets/catppuccin.png",
  },
  // {
  //   label: "pages.settings.interface.select_theme_options.tokyo_night",
  //   value: "Tokyo-Night",
  //   image: "/assets/rosepine.png",
  // },
  // {
  //   label: "pages.settings.interface.select_theme_options.rosepine",
  //   value: "Rose-Pine",
  //   image: "/assets/rosepine.png",
  // },
  // {
  //   label: "pages.settings.interface.select_theme_options.nord",
  //   value: "Nord",
  //   image: "/assets/rosepine.png",
  // },
];

const ThemeSelect = () => {
  const { theme, setTheme } = useClientServerState();

  const t = useTranslate();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selected = THEME_DATA.find((l) => l.value === theme) || THEME_DATA[1];

  const handleChange = (next: IAppTheme) => {
    // Don't update context for no reason
    if (theme === next) {
      combobox.closeDropdown();
      return;
    }

    // Set theme in context
    setTheme(next);

    // Set theme in cookie ( for persistance )
    setCookie("khofly-app-theme", next, {
      expires: 60 * 60 * 24 * 90, // ~ 90 days
      path: "/",
      domain: process.env.NODE_ENV === "development" ? "localhost" : "khofly.com",
      secure: process.env.HOST?.includes("https") ? true : false,
      sameSite: "Strict",
    });

    combobox.closeDropdown();
  };

  const items = THEME_DATA.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {t(item.label)}
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={(val) => handleChange(val as IAppTheme)}>
      <Combobox.Target>
        <InputBase
          w={200}
          leftSection={
            <Image src={selected.image} w={20} h={20} alt={selected.label + " logo"} />
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
          placeholder="Language"
          value={t(selected.label)}
          classNames={{
            input: classes.combobox_cursor,
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

export default ThemeSelect;
