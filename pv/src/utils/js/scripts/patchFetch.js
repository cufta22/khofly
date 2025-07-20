// Save the original fetch function
const originalFetch = window.fetch;

// Override window.fetch
window.fetch = function (resource, options) {
  let url;
  //   console.log(resource.);

  // Handle different resource types (string, Request object, URL object)
  if (typeof resource === "string" || resource instanceof URL) {
    url = new URL(resource, window.location.href); // Resolve relative URLs
  } else if (resource instanceof Request) {
    url = new URL(resource.url, window.location.href);
  } else {
    // Fallback for other unexpected resource types
    return originalFetch(resource, options);
  }

  // Your proxy logic to rewrite the URL
  // For example, prepend your proxy base URL
  // Assuming your proxy is at `https://yourproxy.com/` and the original site is `https://original.com/`
  // You'd need a mapping or a way to determine the original host from the proxied URL
  // This is a simplified example:
  const proxiedUrl = `https://yourproxy.com/proxy?url=${encodeURIComponent(url.toString())}`;

  // If the original resource was a Request object, create a new one with the proxied URL
  if (resource instanceof Request) {
    resource = new Request(proxiedUrl, resource);
  } else {
    resource = proxiedUrl;
  }

  // Call the original fetch with the modified resource and options
  return originalFetch(resource, options);
};
