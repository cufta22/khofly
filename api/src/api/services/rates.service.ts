import type { Context } from "elysia";
import path from "node:path";
import { __dirname } from "../../config";

// GET - /rates
export const handleGetRates = async (ctx: Context) => {
  const tempDir = path.join(__dirname, `/../temp`);

  const resultJson = await Bun.file(
    path.join(tempDir, `/exchange_rates.json`)
  ).json();

  if (!resultJson) {
    ctx.set.status = 400;
    return "Data not found";
  }

  return resultJson;
};
