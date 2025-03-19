import { UnitsType } from "../components/Unit";
import { KEYWORDS_CURRENCY } from "./keywords_currency";
import { KEYWORDS_UNITS_GENERAL, KEYWORDS_UNITS_ALL_MAP } from "./keywords_units";

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

export const shouldDisplayIAExact = (query: string, keywords: string[]) => {
  let shouldDisplay = false;

  keywords.map((val) => {
    if (query?.toLowerCase() === val.toLocaleLowerCase()) shouldDisplay = true;
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
      if (array.includes(unit1.toLocaleLowerCase()) && array.includes(unit2.toLocaleLowerCase())) {
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

// -----------------------------------------------------------------------------------
// Equation handler
// -----------------------------------------------------------------------------------

export const shouldDisplayEquation = (query: string) => {
  const re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

  return re.test(query);
};

// -----------------------------------------------------------------------------------
// Currency handler
// -----------------------------------------------------------------------------------

export const shouldDisplayCurrency = (query: string) => {
  const currency1 = query.split(" ")[0]?.toLocaleLowerCase();
  const currency2 = query.split(" ")[2]?.toLocaleLowerCase();

  let sdCurr = false;

  const currencyArray = Object.keys(KEYWORDS_CURRENCY).map((val) => val.toLocaleLowerCase());

  // Display currency convertor if query is unclear
  if (currencyArray.includes(query)) sdCurr = true;

  if (
    (query?.includes("to") && currencyArray.includes(currency1?.toLocaleLowerCase())) ||
    currencyArray.includes(currency2?.toLocaleLowerCase())
  ) {
    sdCurr = true;
  }

  return {
    sdCurr,
    currency1,
    currency2,
  };
};

// -----------------------------------------------------------------------------------
// Time In handler
// -----------------------------------------------------------------------------------

export const shouldDisplayTimeIn = (query: string) => {
  const location = query.split("in")?.[1]?.toLocaleLowerCase()?.trimStart() || "";

  let sdTimeIn = false;

  // Display time in if query contains
  if (query.includes("time in")) sdTimeIn = true;

  return {
    sdTimeIn,
    location,
  };
};
