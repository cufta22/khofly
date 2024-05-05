// import { json as nodeJson } from "@remix-run/node";
import { json as cloudflareJson } from "@remix-run/cloudflare";
// import { json as vercelJson } from "@vercel/remix";

// Change functions based on deployment target
const HOST_TARGET = "cloudflare";

const platformJson =
  {
    // node: nodeJson,
    // vercel: vercelJson,
    cloudflare: cloudflareJson,
  }[HOST_TARGET] || cloudflareJson;

export { platformJson };
