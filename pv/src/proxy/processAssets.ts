import { getPerScriptResolve } from "../utils/js/getPerScriptResolve";
import { getImportResolve } from "../utils/js/getImportResolve";
import { getPerScriptResolveTest } from "../utils/js/getPerScriptResolveTest";
import { kv_Actions } from "../kv";

interface Args {
  targetUUID: string;
  targetAssetPath: string;
  ASSET_BASE_URL: string;
}

export const handleProcessAssets = async (args: Args) => {
  const { targetUUID, targetAssetPath, ASSET_BASE_URL } = args;

  const resourceOrigin = kv_Actions.get({ by: "key", val: targetUUID });

  const assetUrl = `${resourceOrigin?.value}/${targetAssetPath}`;
  console.log(assetUrl);

  // Fetch the resource
  const response = await fetch(assetUrl, {
    method: "GET",
    headers: {
      Referer: "",
      Cookie: "",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    },
  });

  // If we got a successful response
  if (response.ok) {
    // Get the content type
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    // -----------------------------------------------------------
    // Handle icons, fonts, etc.
    // -----------------------------------------------------------
    if (
      // Icons
      contentType.includes("application/octet-stream") ||
      // Fonts
      contentType.includes("font") ||
      assetUrl.match(/\.(woff2?|ttf|otf|eot)$/i)
    ) {
      // Get the asset data as ArrayBuffer
      const resourceData = await response.arrayBuffer();

      // Send the resource data
      return { contentType: contentType, asset: Buffer.from(resourceData) };
    }

    // -----------------------------------------------------------
    // Handle JS files
    // -----------------------------------------------------------
    if (contentType.includes("application/javascript") || contentType.includes("text/javascript")) {
      const jsContent = await response.text();

      const injectionResolve = getPerScriptResolve();
      const injectionResolve2 = getImportResolve(`${ASSET_BASE_URL}?url=`);
      const injectionResolve3 = getPerScriptResolveTest();
      //const injection = "";
      const injectionTest = `console.log("TESTING");`;
      const injectedJsContent = injectionResolve3 + jsContent;

      // Regex to find import("*");
      const importRegex = /(import\s*\(\s*["'`])(https?:\/\/[^"')`]+)(["'`]\s*\))/gi;

      // const modifiedJsContent = injectedJsContent.replace(importRegex, (match, p1, p2, p3) => {
      //   // p1 = import("
      //   // p2 = original url
      //   // p3 = ")
      //   const proxiedUrl = `${ASSET_BASE_URL}?url=${p2}`;

      //   return `${p1}${proxiedUrl}${p3}`;
      // });

      return { contentType: "application/javascript", asset: jsContent };
    }

    // -----------------------------------------------------------
    // Handle JSON
    // -----------------------------------------------------------
    if (contentType.includes("application/json")) {
      // Get the json data
      const resourceData = await response.json();

      // Send the resource data
      return { contentType, asset: resourceData };
    }

    // -----------------------------------------------------------
    // Handle other stuff
    // -----------------------------------------------------------

    const resourceData = await response.text();
    return { contentType, asset: resourceData };
  } else {
    return { contentType: "", asset: "" };
  }
};
