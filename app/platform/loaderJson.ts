import { json as reactJson } from "@remix-run/react";
import { json as cloudflareJson } from "@remix-run/cloudflare";
// import { json as vercelJson } from "@vercel/remix";

// Change functions based on deployment target
const hostTarget = process.env.HOST_TARGET as string;

const platformLoaderJson =
  {
    node: reactJson,
    // vercel: vercelJson,
    cloudflare: cloudflareJson,
  }[hostTarget] || cloudflareJson;

export { platformLoaderJson };
