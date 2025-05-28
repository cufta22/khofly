import { randomUUIDv7 } from "bun";
import { kv_Actions } from "../kv";

interface Args {
  source: string;
  targetUUID: string;
}

// Create proxy URL
// input 1: /asset/index.js
// input 2: https://cdn.example.com/asset/index.js
// output: /12345/asset/index.js

export const createProxyURL = (args: Args) => {
  const { source, targetUUID } = args;

  // If it's same origin link
  if (source && !source.startsWith("http") && !source.startsWith("//")) {
    // Create proxied URL
    return `/proxy/${targetUUID}/${source}`;
  }

  // If it's 3rd party link, still proxy
  if (source?.startsWith("http")) {
    const url = new URL(source);
    const hrefOrigin = url.origin;
    const hrefPathname = url.pathname;

    const existingKV = kv_Actions.get({ by: "value", val: hrefOrigin });

    // Create proxied URL
    if (existingKV) {
      return `/proxy/${existingKV.key}${hrefPathname}`;
    } else {
      const newKey = randomUUIDv7();
      kv_Actions.set({ key: newKey, value: hrefOrigin });

      return `/proxy/${newKey}${hrefPathname}`;
    }
  }
};
