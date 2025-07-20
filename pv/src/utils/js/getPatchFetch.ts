import fs from "node:fs";
import path from "node:path";

// Patch the url of fetch() requests
export const getPatchFetch = () => {
  const filePath = path.join(__dirname, "./scripts/patchFetch.js");
  const patchFetchScript = fs.readFileSync(filePath, "utf8");

  // Replace proxy base URL
  //   importResolveScript.replaceAll("{proxyBase}", args.proxyBase);

  return patchFetchScript;
};
