import type { Context } from "elysia";

import { handleProxyHtml } from "./proxyHtml";
import { handleProxyAssets } from "./proxyAssets";
import { handleProxyOther } from "./proxyOther";

export const proxyHtml = async (ctx: Context) => {
  return await handleProxyHtml(ctx);
};
export const proxyAssets = async (ctx: Context) => {
  return await handleProxyAssets(ctx);
};
export const proxyOther = async (ctx: Context) => {
  return await handleProxyOther(ctx);
};
