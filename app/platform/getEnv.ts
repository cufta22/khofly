// process.env for node, context for cloudflare
export const getEnv = (name: string, ctx?: any) => {
  // Handle Node.js
  if (typeof process !== "undefined") {
    return process.env?.[name] || "";
  }

  // Handle Cloudflare
  if (ctx) {
    return ctx.env?.[name] || "";
  }

  return "";
};
