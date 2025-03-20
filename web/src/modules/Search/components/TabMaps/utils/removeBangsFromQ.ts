export const removeBangsFromQ = (q: string): string => {
  return q
    .split(" ")
    .filter((word) => !word.startsWith("!"))
    .join(" ");
};
