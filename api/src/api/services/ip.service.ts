import type { Context } from "elysia";

// GET - /ip
export const handleGetIP = async (ctx: Context) => {
  console.log(ctx.request.headers);

  // Try to get IP from headers
  const myIP =
    ctx.request.headers.get("x-real-ip") ||
    ctx.request.headers.get("x-forwarder-for") ||
    "No IP found";

  return { error: false, message: "Request IP", data: myIP };
};
