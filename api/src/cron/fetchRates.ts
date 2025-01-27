import path from "path";
import fs from "fs/promises";

import { __dirname } from "../config";

export const cron_fetchRates = async () => {
  const tempDir = path.join(__dirname, `/../temp`);

  // Remove old rates
  for (const file of await fs.readdir(tempDir)) {
    if (file === ".gitkeep") continue;
    await fs.unlink(path.join(tempDir, file));
  }

  // Fetch latest
  const res = await fetch(
    `${process.env.OPEN_EXCHANGE_RATES_URL}/api/latest.json?base=USD&app_id=${process.env.OPEN_EXCHANGE_RATES_API_KEY}`
  );

  const resData: any = await res.json();
  console.log(resData?.timestamp);

  if (!resData.rates) return;

  // Create new rates file
  const inputPath = path.join(__dirname, `/../temp/exchange_rates.json`);

  await Bun.write(inputPath, JSON.stringify(resData));
};
