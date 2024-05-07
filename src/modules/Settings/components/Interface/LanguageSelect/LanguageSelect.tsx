import { Combobox, InputBase, useCombobox } from "@mantine/core";

import classes from "./styles.module.scss";
import {
  DotNestedKeys,
  ILanguage,
  ITranslations,
  RootLoaderData,
} from "@ts/global.types";
import { getIconStyle } from "@utils/functions/iconStyle";

import { useTranslate } from "@hooks/translate/use-translate";
import { setCookie } from "@utils/functions/cookies";

import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import { useClientServerState } from "@store/client-server";
import { FlagProps } from "@components/Icons/types";
import { USFlag } from "@components/Icons/Flags";

interface ILangData {
  label: DotNestedKeys<ITranslations>;
  value: string;
  icon: React.FC<FlagProps>;
}

const LANG_DATA: ILangData[] = [
  {
    label: "pages.settings.interface.select_lang_options.en",
    value: "en",
    icon: USFlag,
  },
  // {
  //   label: "pages.settings.interface.select_lang_options.de",
  //   value: "de",
  //   icon: DEFlag,
  // },
];

const LanguageSelect = () => {
  const loaderData = useRouteLoaderData("root") as RootLoaderData;

  const { language } = useClientServerState();

  const t = useTranslate();
  const navigate = useNavigate();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleChange = (next: ILanguage) => {
    setCookie("khofly-language", next, {
      expires: 60 * 60 * 24 * 90, // ~ 90 days
      path: "/",
      domain:
        loaderData.env.NODE_ENV === "development" ? "localhost" : "khofly.com",
      secure: loaderData.env.HOST?.includes("https") ? true : false,
      sameSite: "Strict",
    });
    // TODO: better way to handle this???
    // navigate() doesn't work because content/language comes from entry.client
    // navigate("/settings?tab=interface", { replace: false });
    window.location.reload();

    combobox.closeDropdown();
  };

  const selected = LANG_DATA.find((l) => l.value === language) || LANG_DATA[1];

  const items = LANG_DATA.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {t(item.label)}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => handleChange(val as ILanguage)}
    >
      <Combobox.Target>
        <InputBase
          w={200}
          leftSection={
            <selected.icon
              style={getIconStyle(25)}
              className={classes.flag_icon}
            />
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
