import { UnitsType } from "../components/Unit";

export const KEYWORDS_UNITS_GENERAL = [
  "unit convert",
  "unit convertor",
  "unit conversion",
  "convert units",
  "convert unit",
];

export const KEYWORDS_UNITS_LENGTH = [
  "m",
  "mm",
  "cm",
  "dm",
  "km",
  "in",
  "ft",
  "yd",
  "mi",
];

export const KEYWORDS_UNITS_AREA = [
  "m2",
  "ares",
  "acre",
  "ha",
  "in2",
  "ft2",
  "yd2",
  "mi2",
];

export const KEYWORDS_UNITS_VOLUME = [
  "m3",
  "l",
  "ml",
  "cl",
  "dl",
  "hl",
  "in3",
  "ft3",
  "yd3",
  "acre ft",
  "tsp",
  "fl oz",
  "cup",
  "gill",
  "pt",
  "qt",
  "gal",
];

export const KEYWORDS_UNITS_ANGLE = ["deg", "rad"];

export const KEYWORDS_UNITS_TIME = ["sec", "min", "hour", "day", "year"];

export const KEYWORDS_UNITS_MASS = [
  "g",
  "kg",
  "gr",
  "dr",
  "oz",
  "lb",
  "cwt",
  "ton",
  "t",
  "slug",
];

export const KEYWORDS_UNITS_TEMPERATURE = ["k", "c", "f"];

export const KEYWORDS_UNITS_ALL_MAP: {
  [key in UnitsType]: {
    type: UnitsType;
    array: string[];
  };
} = {
  length: {
    type: "length",
    array: KEYWORDS_UNITS_LENGTH,
  },
  area: {
    type: "area",
    array: KEYWORDS_UNITS_AREA,
  },
  volume: {
    type: "volume",
    array: KEYWORDS_UNITS_VOLUME,
  },
  angle: {
    type: "angle",
    array: KEYWORDS_UNITS_ANGLE,
  },
  time: {
    type: "time",
    array: KEYWORDS_UNITS_TIME,
  },
  mass: {
    type: "mass",
    array: KEYWORDS_UNITS_MASS,
  },
  temperature: {
    type: "temperature",
    array: KEYWORDS_UNITS_TEMPERATURE,
  },
};
