import { Elysia } from "elysia";
import packageJson from "../package.json";

import * as proxy from "./proxy/index";

const app = new Elysia({ serve: { idleTimeout: 100 } })

  // .get("/", () => `Khofly PV proxy v${packageJson.version}`)

  .get("/*", proxy.proxyOther) // Proxy any other page asset/request that isn't loaded initially
  .get("/proxy/page", proxy.proxyHtml) // Proxy webpage HTML privately
  .get("/proxy/asset", proxy.proxyAssets) // Proxy webpage assets privately

  .listen(process.env.PORT || 4001);

console.log(`🦊 Khofly PV is running at ${app.server?.hostname}:${app.server?.port}`);
