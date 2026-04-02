import type { FlagProps } from '@components/Icons/types';
import { GBFlag, RSFlag } from '@components/Icons';
import type { DotNestedKeys, ITranslations } from '@ts/global.types';

interface ILangData {
  label: DotNestedKeys<ITranslations>;
  value: string;
  icon: React.FC<FlagProps>;
  isWip: boolean;
}

export const LANG_DATA: ILangData[] = [
  {
    label: 'pages.settings.interface.select_lang_options.en',
    value: 'en',
    icon: GBFlag,
    isWip: false, // Always false since it's the default
  },
  {
    label: 'pages.settings.interface.select_lang_options.sr',
    value: 'sr',
    icon: RSFlag,
    isWip: true,
  },
  // {
  //   label: "pages.settings.interface.select_lang_options.de",
  //   value: "de",
  //   icon: DEFlag,
  // },
];
