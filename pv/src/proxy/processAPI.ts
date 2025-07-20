import { kv_Actions } from "../kv";

interface Args {
  targetApiOrigin: string;
  targetApiPath: string;
  reqMethod: string;
}

export const handleProcessApi = async (args: Args) => {
  const { targetApiPath, targetApiOrigin, reqMethod } = args;

  const requestUrl = `${targetApiOrigin}/${targetApiPath}`;

  if (!requestUrl) return { contentType: "", asset: "" };

  // Fetch the resource
  const response = await fetch(requestUrl, {
    method: reqMethod,
    headers: {
      // Referer: "",
      Cookie: "",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    },
  });

  // If we got a successful response
  if (response.ok) {
    // Get the content type
    const contentType = response.headers.get("content-type") || "application/json";

    // -----------------------------------------------------------
    // Handle JSON
    // -----------------------------------------------------------
    if (contentType.includes("application/json")) {
      // Get the json data
      const resourceData = await response.json();

      // Send the resource data
      return { contentType, response: resourceData };
    }

    // -----------------------------------------------------------
    // Handle other stuff
    // -----------------------------------------------------------

    const resourceData = await response.text();
    return { contentType, response: resourceData };
  } else {
    return { contentType: "", response: "" };
  }
};
