import { AppLoadContext } from "@remix-run/cloudflare";

// process.env for node, context for cloudflare
export const getEnv = (name: string, ctx?: AppLoadContext) => {
  // Handle Node.js
  // if (typeof process !== "undefined") {
  //   return process.env?.[name] || "";
  // }

  // Handle Cloudflare
  if (ctx && ctx.cloudflare) {
    // @ts-ignore
    return ctx.cloudflare.env?.[name] || "";
  }

  return "";
};
