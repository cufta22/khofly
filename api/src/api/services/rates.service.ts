import type { Context } from "elysia";
import path from "node:path";
import { __dirname } from "../../config";

// GET - /rates
export const handleGetRates = async (ctx: Context) => {
  const tempDir = path.join(__dirname, `/../temp`);

  const resultJson = await Bun.file(path.join(tempDir, `/exchange_rates.json`)).json();

  if (!resultJson) {
    throw ctx.error(400, "exchange_rates.json not found");
  }

  return {
    error: false,
    message: "Open Exchange Rates data",
    data: resultJson,
  };
};
