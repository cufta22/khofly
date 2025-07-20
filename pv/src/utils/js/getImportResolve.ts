import fs from "node:fs";
import path from "node:path";

interface Args {
  proxyBase: string;
  baseUUID: string;
}

// Fix the module resolution from stuff like import * from "..."
// Injected globally
export const getImportResolve = (args: Args) => {
  const filePath = path.join(__dirname, "./scripts/importResolve.js");
  const importResolveScript = fs.readFileSync(filePath, "utf8");

  // Replace proxy base URL
  importResolveScript.replaceAll("{proxyBase}", args.proxyBase);

  return importResolveScript;
};
