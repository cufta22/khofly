export const getAIChatModelSource = (model: string) => {
  if (model.includes("@cf") || model.includes("@hf")) {
    return "cf";
  } else {
    return "google";
  }
};
