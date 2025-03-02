import path from "node:path";
import fs from "node:fs/promises";

import { __dirname } from "../config";

export const cron_clearMedia = async () => {
  const mediaDir = path.join(__dirname, `/../temp/media`);

  // Remove old rates
  for (const file of await fs.readdir(mediaDir)) {
    if (file === ".gitkeep") continue; // Keep on git

    // Add logic to read dates
    await fs.unlink(path.join(mediaDir, file));
  }
};
