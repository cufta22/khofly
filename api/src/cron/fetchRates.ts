import path from "node:path";
import fs from "node:fs/promises";

import { __dirname } from "../config";

export const cron_fetchRates = async () => {
  const tempDir = path.join(__dirname, `/../temp`);

  // Remove old rates
  for (const file of await fs.readdir(tempDir)) {
    if (file === ".gitkeep") continue; // Keep on git
    if (file === "media") continue; // For media files

    await fs.unlink(path.join(tempDir, file));
  }

  // Make sure that API key exists
  if (!process.env.OPEN_EXCHANGE_RATES_API_KEY) {
    // console.log("Missing OXR API key!");
    return;
  }

  // Fetch latest
  const res = await fetch(
    `${process.env.OPEN_EXCHANGE_RATES_URL}/api/latest.json?base=USD&app_id=${process.env.OPEN_EXCHANGE_RATES_API_KEY}`
  );

  const resData: any = await res.json();

  if (!resData.rates) return;

  // Create new rates file
  const inputPath = path.join(__dirname, `/../temp/exchange_rates.json`);

  await Bun.write(inputPath, JSON.stringify(resData));
};
