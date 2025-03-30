import type { MantineColor } from "@mantine/core";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export interface IColorData {
  label: DotNestedKeys<ITranslations>;
  value: MantineColor;
}

export const COLORS_DATA: IColorData[] = [
  {
    label: "pages.settings.interface.select_primary_color_options.dark",
    value: "dark",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.gray",
    value: "gray",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.red",
    value: "red",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.pink",
    value: "pink",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.grape",
    value: "grape",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.violet",
    value: "violet",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.indigo",
    value: "indigo",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.blue",
    value: "blue",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.cyan",
    value: "cyan",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.teal",
    value: "teal",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.green",
    value: "green",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.lime",
    value: "lime",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.yellow",
    value: "yellow",
  },
  {
    label: "pages.settings.interface.select_primary_color_options.orange",
    value: "orange",
  },
];
