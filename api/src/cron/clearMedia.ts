import path from "node:path";
import fs from "node:fs/promises";

import { __dirname } from "../config";

export const cron_clearMedia = async () => {
  const mediaDir = path.join(__dirname, `/../temp/media`);

  // Remove old media files
  for (const file of await fs.readdir(mediaDir)) {
    if (file === ".gitkeep") continue; // Keep on git

    if (file.length > 26) continue; // Skip temp files

    // Parse the input date string (format: YYYY-MM-DD-HH-mm)
    const [year, month, day, hour, minute] = file.substring(0, 16).split("-").map(Number);

    // JavaScript months are 0-indexed (0 = January, 11 = December)
    const fileTime = new Date(year, month - 1, day, hour, minute);

    const now = new Date();

    const diffInMilliseconds = now.getTime() - fileTime.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    const isOlderThan1H = diffInHours > 1;

    if (isOlderThan1H) {
      await fs.unlink(path.join(mediaDir, file));
    }
  }
};
