import { json as nodeJson } from "@remix-run/node";
// import { json as cloudflareJson } from "@remix-run/cloudflare";
import { json as vercelJson } from "@vercel/remix";

// Change functions based on deployment target
const hostTarget = process.env.HOST_TARGET as "node" | "vercel";

const platformJson = {
  node: nodeJson,
  vercel: vercelJson,
  // cloudflare: cloudflareJson,
}[hostTarget];

export { platformJson };
