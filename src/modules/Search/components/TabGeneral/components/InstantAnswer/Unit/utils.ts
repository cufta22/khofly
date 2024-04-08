import { UnitsType } from ".";

const conversionFactors: { [key in UnitsType]: any } = {
  length: {
    m: 1, // Base unit
    mm: 0.001,
    cm: 0.01,
    dm: 0.1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34,
  },
  area: {
    m2: 1, // Base unit
    ares: 100,
    acre: 4048.556,
    ha: 10000,
    in2: 0.00064516,
    ft2: 0.09290304,
    yd2: 0.83612736,
    mi2: 2.58998811e6,
  },
  volume: {
    m3: 1, // Base unit
    l: 0.001,
    ml: 0.000001,
    cl: 0.00001,
    dl: 0.0001,
    hl: 100,
    in3: 0.000016387,
    ft3: 0.0283168,
    yd3: 0.7645548,
    "acre ft": 1233.48,
    tsp: 0.00492892,
    "fl oz": 0.0295735,
    cup: 0.24,
    gill: 0.118255,
    pt: 0.473176,
    qt: 0.946353,
    gal: 3.78541,
  },
  angle: {
    deg_to_rad: (deg: number) => deg * (Math.PI / 180), // Conversion function for radians
    rad_to_deg: (rad: number) => rad * (180 / Math.PI), // Conversion function for degrees
  },
  time: {
    sec: 1, // Base unit
    min: 60,
    hour: 3600,
    day: 86400,
    year: 31536000, // Approximate average value, can vary slightly
  },
  mass: {
    g: 1, // Base unit
    kg: 1000,
    gr: 0.00006479, // 1 grain = 64.79 milligrams
    dr: 0.0373242, // 1 dram (avoirdupois) = 3.732 grams
    oz: 28.3495,
    lb: 453.592,
    cwt: 45359.2, // 1 hundredweight (US) = 100 pounds
    ton: 907.185, // 1 ton (short ton, US) = 2000 pounds
    t: 1000000, // 1 metric ton = 1000 kilograms
    slug: 14.5939, // 1 slug (engineering unit) = 14.594 kg⋅m/s²
  },
  temperature: {
    c_to_k: (c: number) => c + 273.15,
    c_to_f: (c: number) => c * (9 / 5) + 32,

    k_to_c: (k: number) => k - 273.15,
    k_to_f: (k: number) => (k - 273.15) * (9 / 5) + 32,

    f_to_c: (f: number) => (f - 32) * (5 / 9),
    f_to_k: (f: number) => (f - 32) * (5 / 9) + 273.15,
  },
};

export const convertUnit = (
  value: number,
  fromUnit: string,
  toUnit: string,
  type: UnitsType
) => {
  // Handle temperature because formulas
  if (type === "temperature") {
    const formula =
      conversionFactors.temperature[
        `${fromUnit.toLocaleLowerCase()}_to_${toUnit.toLocaleLowerCase()}`
      ];

    if (!formula) return 0;

    return formula(value);
  }

  // Handle angle because formulas
  if (type === "angle") {
    const formula =
      conversionFactors.angle[
        `${fromUnit.toLocaleLowerCase()}_to_${toUnit.toLocaleLowerCase()}`
      ];

    if (!formula) return 0;

    return formula(value);
  }

  // Get conversion factors
  const fromFactor = conversionFactors[type][fromUnit];
  const toFactor = conversionFactors[type][toUnit];

  // Perform conversion
  return value * (fromFactor / toFactor);
};
