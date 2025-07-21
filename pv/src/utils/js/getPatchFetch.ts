import fs from "node:fs";
import path from "node:path";

interface Args {
  apiBase: string;
  targetUrl: string;
}

// Patch the url of fetch() requests
export const getPatchFetch = (args: Args) => {
  const filePath = path.join(__dirname, "./scripts/patchFetch.js");
  const patchFetchScript = fs.readFileSync(filePath, "utf8");

  // Replace proxy base URL
  patchFetchScript.replaceAll("{apiBase}", args.apiBase);

  // Replace proxy base URL
  patchFetchScript.replaceAll("{targetUrl}", args.targetUrl);

  return patchFetchScript;
};
