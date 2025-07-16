export const cp_hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const cp_rgbToHex = (rgb: { r: number; g: number; b: number }) => {
  // Ensure that the input values are within the valid range (0-255)
  const newR = Math.max(0, Math.min(255, rgb.r));
  const newG = Math.max(0, Math.min(255, rgb.g));
  const newB = Math.max(0, Math.min(255, rgb.b));

  // Convert each component to a two-digit hexadecimal string
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(newR) + toHex(newG) + toHex(newB);
};
