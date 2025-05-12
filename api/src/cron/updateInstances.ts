import path from "node:path";
import fs from "node:fs/promises";

import { __dirname } from "../config";
import { checkSecurityHeaders } from "./utils/checkSecurityHeaders";

interface IInstancesRes {
  instances: {
    name: string;
    url: string;
    html: string;
  }[];
}

export const cron_updateInstances = async () => {
  const tempDir = path.join(__dirname, `/../temp`);

  // Don't run if disabled in .env
  if (process.env.RUN_PUBLIC_INSTANCE === "0") {
    return;
  }

  // Remove old rates
  for (const file of await fs.readdir(tempDir)) {
    if (file === ".gitkeep") continue; // Keep on git
    if (file === "media") continue; // For media files

    if (file === "instances.json") {
      await fs.unlink(path.join(tempDir, file));
    }
  }

  // Fetch instances file
  const res = await fetch(
    "https://raw.githubusercontent.com/cufta22/khofly/refs/heads/staging/instances.json"
  );

  const resData: IInstancesRes = await res.json();

  if (!resData.instances) return;

  const modInstances = [];

  // Modify the data
  for (const item of resData.instances) {
    // Get the version
    const resVersion = await fetch(`${item.url}/api/version`);
    const resVersionData: { version: string } = await resVersion.json();
    const isBeta = resVersionData.version.startsWith("0");

    // Check security headers
    const cspScore = checkSecurityHeaders(resVersion.headers);

    modInstances.push({
      name: item.name,
      url: item.url,
      version: `v${resVersionData.version}${isBeta ? " beta" : ""}`,
      csp: cspScore,
      html: item.html || "Vanilla",
    });
  }

  // Create new rates file
  const inputPath = path.join(__dirname, `/../temp/instances.json`);

  await Bun.write(
    inputPath,
    JSON.stringify({
      instances: modInstances,
    })
  );
};
