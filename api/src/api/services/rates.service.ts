import type { Context } from "elysia";
import path from "node:path";
import { __dirname } from "../../config";

// GET - /rates
export const handleGetRates = async (ctx: Context) => {
  const tempDir = path.join(__dirname, `/../temp`);

  const resultFile = Bun.file(path.join(tempDir, `/exchange_rates.json`));

  if (!resultFile.size) {
    throw ctx.error(400, "exchange_rates.json not found");
  }

  const resultJson = await resultFile.json();

  return {
    error: false,
    message: "Open Exchange Rates data",
    data: resultJson,
  };
};
