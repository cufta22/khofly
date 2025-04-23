import type { Context } from "elysia";
import path from "node:path";
import { __dirname } from "../../config";

// GET - /instances
export const handleGetInstances = async (ctx: Context) => {
  const tempDir = path.join(__dirname, `/../temp`);

  const instancesFile = Bun.file(path.join(tempDir, `/instances.json`));

  if (!instancesFile.size) {
    return {
      error: false,
      message: "Empty instances data",
      data: {
        instances: [],
      },
    };
  }

  const instancesJson = await instancesFile.json();

  return {
    error: false,
    message: "Instances data",
    data: instancesJson,
  };
};
