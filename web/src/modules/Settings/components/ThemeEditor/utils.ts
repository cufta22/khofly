export const isJSONString = (value: unknown): boolean => {
  if (typeof value === "string") {
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};
