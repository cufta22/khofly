import type { Context } from "elysia";

// GET - /ip
export const handleGetIP = async (ctx: Context) => {
  // Try to get IP from headers
  const myIP =
    ctx.request.headers.get("x-real-ip") ||
    ctx.request.headers.get("x-forwarded-for") ||
    "No IP found";

  return { error: false, message: "Request IP", data: myIP };
};
