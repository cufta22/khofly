import { Context } from "elysia";
import path from "path";
import { __dirname } from "../../config";

// GET - /rates
export const handleGetRates = async (ctx: Context) => {
  const tempDir = path.join(__dirname, `/../temp`);

  const resultJson = await Bun.file(
    path.join(tempDir, `/exchange_rates.json`)
  ).json();

  if (!resultJson) {
    ctx.set.status = 500;
    return "Data not found";
  }

  return resultJson;
};
