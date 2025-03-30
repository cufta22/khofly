import { file } from "bun";

export const checkFileExists = async (filePath: string) => {
  try {
    await file(filePath).exists();
    return true;
  } catch {
    return false;
  }
};
