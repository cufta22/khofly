import { Elysia } from "elysia";
import packageJson from "../package.json";

import { handleProxy } from "./proxy/handleProxy";
import { handleApi } from "./proxy/handleAPI";

import { kv_Actions } from "./kv";

const app = new Elysia({ serve: { idleTimeout: 100 } })

  .get("/", () => {
    kv_Actions.getAll();

    return `Khofly PV proxy v${packageJson.version}`;
  })

  .get("/proxy/*", handleProxy) // Handle proxy html & assets

  .get("/api/*", handleApi) // Handle proxy API requests

  .listen(process.env.PORT || 4001);

console.log(`🦊 Khofly PV is running at ${app.server?.hostname}:${app.server?.port}`);
