import type { MantineColor } from '@mantine/core';
import type {
  Icon,
  IconProps} from '@tabler/icons-react';
import {
  IconAlignLeft,
  IconArrowsShuffle,
  IconCalculator,
  IconCalendar,
  IconCash,
  IconChristmasTree,
  IconCircle,
  IconCloudNetwork,
  IconDice,
  IconDownload,
  IconEqual,
  IconHaze,
  IconHourglassLow,
  IconLanguage,
  IconMapPin,
  IconMusic,
  IconPalette,
  IconPassword,
  IconRulerMeasure,
  IconStopwatch,
  IconTicTac,
  IconTimezone,
} from '@tabler/icons-react';
import type { IAllIAs } from '@ts/search.types';

export const DOCS_INSTANT_ANSWERS: {
  [key in IAllIAs]: {
    title: string;
    title_short: string;
    group: '' | 'clock' | 'converter' | 'games' | 'global_time';
    color: MantineColor;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  };
} = {
  calculator: {
    title: 'Calculator',
    title_short: 'Calculator',
    group: '',
    color: 'gray.5',
    icon: IconCalculator,
  },
  calendar: {
    title: 'Calendar',
    title_short: 'Calendar',
    group: '',
    color: 'gray.5',
    icon: IconCalendar,
  },
  coin_flip: {
    title: 'Coin Flip',
    title_short: 'Coin Flip',
    group: 'games',
    color: 'gray.5',
    icon: IconCircle,
  },
  color_picker: {
    title: 'Color Picker',
    title_short: 'Color Picker',
    group: '',
    color: 'gray.5',
    icon: IconPalette,
  },
  currency: {
    title: 'Currency Converter',
    title_short: 'Currency',
    group: 'converter',
    color: 'green.6',
    icon: IconCash,
  },
  days_till_christmas: {
    title: 'Days Till Christmas',
    title_short: 'Christmas',
    group: '',
    color: 'green.5',
    icon: IconChristmasTree,
  },
  dice_roll: {
    title: 'Dice Roll',
    title_short: 'Dice Roll',
    group: 'games',
    color: 'gray.5',
    icon: IconDice,
  },
  downloader: {
    title: 'Downloader',
    title_short: 'Downloader',
    group: '',
    color: 'gray.5',
    icon: IconDownload,
  },
  equation: {
    title: 'Equation',
    title_short: 'Equation',
    group: '',
    color: 'gray.5',
    icon: IconEqual,
  },
  ip: {
    title: "What's my IP",
    title_short: 'IP',
    group: '',
    color: 'cyan.5',
    icon: IconCloudNetwork,
  },
  lorem_ipsum: {
    title: 'Lorem Ipsum',
    title_short: 'Ipsum',
    group: '',
    color: 'gray.5',
    icon: IconAlignLeft,
  },
  lyrics: {
    title: 'Song Lyrics',
    title_short: 'Lyrics',
    group: '',
    color: 'gray.5',
    icon: IconMusic,
  },
  password: {
    title: 'Password Generator',
    title_short: 'Password',
    group: '',
    color: 'gray.5',
    icon: IconPassword,
  },
  rng: {
    title: 'Random Number generator',
    title_short: 'RNG',
    group: '',
    color: 'gray.5',
    icon: IconArrowsShuffle,
  },
  stopwatch: {
    title: 'Stopwatch',
    title_short: 'Stopwatch',
    group: 'clock',
    color: 'gray.5',
    icon: IconStopwatch,
  },
  tictactoe: {
    title: 'TicTacToe',
    title_short: 'TicTacToe',
    group: 'games',
    color: 'gray.5',
    icon: IconTicTac,
  },
  time_in: {
    title: 'Time In *',
    title_short: 'Time In',
    group: 'global_time',
    color: 'gray.5',
    icon: IconMapPin,
  },
  time_zone: {
    title: 'Time Zone Converter',
    title_short: 'Time Zone',
    group: 'global_time',
    color: 'gray.5',
    icon: IconTimezone,
  },
  timer: {
    title: 'Timer',
    title_short: 'Timer',
    group: 'clock',
    color: 'gray.5',
    icon: IconHourglassLow,
  },
  translate: {
    title: 'Translate',
    title_short: 'Translate',
    group: '',
    color: 'blue.6',
    icon: IconLanguage,
  },
  unit: {
    title: 'Units Converter',
    title_short: 'Units',
    group: 'converter',
    color: 'gray.5',
    icon: IconRulerMeasure,
  },
  uuid: {
    title: 'Random UUID',
    title_short: 'UUID',
    group: '',
    color: 'gray.5',
    icon: IconArrowsShuffle,
  },
  weather: {
    title: 'Weather',
    title_short: 'Weather',
    group: '',
    color: 'orange.5',
    icon: IconHaze,
  },
};
