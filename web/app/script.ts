// Injected globally
export const getJsInjectResolve = (proxyBase: string) => {
  return `
  // This JS snippet will be injected by your Node.js proxy
  // at the top of relevant script tags or HTML.
  
  // Define a global object for your proxy's client-side utilities
  window.__privateView = {
      // This assumes your proxy format is https://your-proxy.com/proxy/{encoded_original_url}
      // You'll need to adapt this if your proxy URL structure is different.
      urlConverter: {
          unproxifyUrls: (proxiedUrl) => {
              const proxyBase = '${proxyBase}'; // **IMPORTANT: Replace with your actual proxy base URL**
              if (proxiedUrl.startsWith(proxyBase)) {
                  try {
                      const encodedOriginalUrl = proxiedUrl.substring(proxyBase.length);
                      // Decode the URL twice if it was encoded for a query param,
                      // or once if it's part of the path directly.
                      // Startpage's example likely decodes just once if it's directly in the path.
                      // Adjust based on your chosen proxy URL structure.
                      return decodeURIComponent(encodedOriginalUrl);
                  } catch (e) {
                      console.error("Error unproxifying URL:", proxiedUrl, e);
                      return proxiedUrl; // Fallback
                  }
              }
              return proxiedUrl; // Not a proxied URL
          },
         // You might also need a 'proxifyUrls' function client-side
          // if your JS ever generates new URLs that need to be proxied.
          proxifyUrls: (originalUrl) => {
              const proxyBase = 'https://your-proxy.com/proxy/'; // **IMPORTANT: Replace with your actual proxy base URL**
              if (originalUrl.startsWith(proxyBase)) {
                  return originalUrl; // Already proxied
              }
              // Ensure originalUrl is absolute before encoding
              if (!originalUrl.startsWith('http')) {
                  // This is a simplified relative URL resolution.
                  // In a real scenario, you'd need the base URL of the *original* page.
                  // For now, assume unproxifyUrls gives us the base.
                  const baseUrl = window.__privateView.urlConverter.unproxifyUrls(window.location.href);
                  originalUrl = new URL(originalUrl, baseUrl).href;
              }
              return \`\${proxyBase}\${encodeURIComponent(originalUrl)}\`;
          }
      },
      // The equivalent of Startpage's __ss_get_resolve
      getResolve: (originalMetaResolve) => {
          return (moduleSpecifier) => {
              // Case 1: Absolute path (e.g., /some/path/to/asset.js)
              // Resolve relative to the unproxified base URL of the current page
              if (moduleSpecifier.startsWith("/")) {
                  const unproxiedCurrentPageUrl = __privateView.urlConverter.unproxifyUrls(window.location.href);
                  // Ensure unproxifiedCurrentPageUrl is a valid base URL (e.g., http://example.com)
                  // We might need to strip off any path components if it's not a root.
                  const baseUrlForAbsolute = new URL('/', unproxiedCurrentPageUrl).href; // Get the origin
                  return __privateView.urlConverter.proxifyUrls(new URL(moduleSpecifier, baseUrlForAbsolute).href);
              } else {
                  // Case 2: Relative path or full URL
                  // Resolve using the original resolver first, then unproxify, then re-proxify
                  // This handles cases where 'import.meta.resolve' might internally return a proxied URL
                  // (if it was already modified by an earlier script) or an unproxied URL.
                  const originallyResolved = originalMetaResolve(moduleSpecifier);
                  const unproxifiedResolved = __privateView.urlConverter.unproxifyUrls(originallyResolved);
                  return __privateView.urlConverter.proxifyUrls(unproxifiedResolved);
              }
          };
      }
  };
  `;
};
