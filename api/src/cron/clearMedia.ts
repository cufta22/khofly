import path from "node:path";
import fs from "node:fs/promises";

import { __dirname } from "../config";
import dayjs from "dayjs";

export const cron_clearMedia = async () => {
  const mediaDir = path.join(__dirname, `/../temp/media`);

  // Remove old media files
  for (const file of await fs.readdir(mediaDir)) {
    if (file === ".gitkeep") continue; // Keep on git

    if (file.length > 26) continue; // Skip temp files

    const fileTime = dayjs(file.substring(0, 16), { format: "YYYY-MM-DD-HH:mm" });
    const now = dayjs();
    const oneHourAgo = now.subtract(1, "hour");

    if (fileTime.isBefore(oneHourAgo)) {
      await fs.unlink(path.join(mediaDir, file));
    }
  }
};
