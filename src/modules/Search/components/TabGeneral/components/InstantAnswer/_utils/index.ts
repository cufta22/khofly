import { UnitsType } from "../Unit";
import {
  KEYWORDS_UNITS_LENGTH,
  KEYWORDS_UNITS_GENERAL,
  KEYWORDS_UNITS_AREA,
  KEYWORDS_UNITS_VOLUME,
  KEYWORDS_UNITS_ANGLE,
  KEYWORDS_UNITS_TIME,
  KEYWORDS_UNITS_MASS,
  KEYWORDS_UNITS_TEMPERATURE,
  KEYWORDS_UNITS_ALL_MAP,
} from "./keywords_units";

// -----------------------------------------------------------------------------------
// General handler
// -----------------------------------------------------------------------------------

export const shouldDisplayIA = (query: string, keywords: string[]) => {
  let shouldDisplay = false;

  keywords.map((val) => {
    if (query?.toLowerCase().includes(val)) shouldDisplay = true;
  });

  return shouldDisplay;
};

// -----------------------------------------------------------------------------------
// Units handler
// -----------------------------------------------------------------------------------

export const shouldDisplayUnits = (
  query: string
): {
  sdUnit: boolean;
  unitType: UnitsType;
  unit1: string;
  unit2: string;
} => {
  const unit1 = query.split(" ")[0]?.toLocaleLowerCase();
  const unit2 = query.split(" ")[2]?.toLocaleLowerCase();

  let returnValue = {
    sdUnit: false,
    unitType: "length" as UnitsType,
    unit1,
    unit2,
  };

  // Display lenght convertor if query is unclear
  if (KEYWORDS_UNITS_GENERAL.includes(query))
    returnValue = {
      sdUnit: true,
      unitType: "length" as UnitsType,
      unit1,
      unit2,
    };

  if (query?.includes("to")) {
    Object.keys(KEYWORDS_UNITS_ALL_MAP).map((val) => {
      // Handle {val} convertor
      const array = KEYWORDS_UNITS_ALL_MAP[val as UnitsType].array;
      if (
        array.includes(unit1.toLocaleLowerCase()) &&
        array.includes(unit2.toLocaleLowerCase())
      ) {
        returnValue = {
          sdUnit: true,
          unitType: val as UnitsType,
          unit1,
          unit2,
        };
      }
    });
  }

  return returnValue;
};