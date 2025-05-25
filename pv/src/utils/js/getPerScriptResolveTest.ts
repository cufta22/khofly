export const getPerScriptResolveTest = () => `
(function() {
    // --- Configuration (ADAPT THESE TO YOUR PROXY) ---
    // This is the base URL of your proxy endpoint.
    const PROXY_BASE_URL = 'http://localhost:4001/proxy/asset?url=';
    console.log('DEBUG: Client Script Loaded. PROXY_BASE_URL:', PROXY_BASE_URL);

    // --- Helper Functions (ADAPT THESE TO YOUR PROXY URL FORMAT) ---
    // Function to unproxify a URL: Extracts the original URL from your proxy URL.
    // Example: "http://localhost:4001/proxy?url=https%3A%2F%2Fexample.com%2Fasset.js"
    //   -> "https://example.com/asset.js"
    function unproxify(proxiedUrl) {
        try {
            const url = new URL(proxiedUrl);
            const originalParam = url.searchParams.get('url');
            if (originalParam) {
                return decodeURIComponent(originalParam);
            }
        } catch (e) {
            // console.warn('Unproxify failed for:', proxiedUrl, e);
        }
        return proxiedUrl; // Return as is if not a proxied URL or parsing fails
    }

    // Function to proxify an original URL: Wraps an original URL in your proxy format.
    // Example: "https://example.com/asset.js"
    //   -> "http://localhost:4001/proxy?url=https%3A%2F%2Fexample.com%2Fasset.js"
    function proxify(originalUrl) {
        let absoluteOriginalUrl;
        try {
            // Ensure originalUrl is an absolute URL relative to the original document's base.
            // This is crucial for correctly resolving relative paths (e.g., "./module.js")
            // when the current module's URL (import.meta.url) is already proxied.
            // We use the unproxified window.location.href as the base for this resolution.
            absoluteOriginalUrl = new URL(originalUrl, unproxify(window.location.href)).href;
        } catch (e) {
            // Fallback for invalid URLs or if unproxify(window.location.href) fails
            console.warn('Could not resolve original URL for proxifying:', originalUrl, e);
            absoluteOriginalUrl = originalUrl;
        }
        return PROXY_BASE_URL + encodeURIComponent(absoluteOriginalUrl);
    }

    // --- Core import.meta.resolve Override Logic ---
    if (typeof import.meta !== 'undefined' && import.meta.resolve) {
        // Capture the original, native import.meta.resolve function
        const nativeResolve = import.meta.resolve.bind(import.meta);

        // Assume window.location.href (proxied) is e.g. "http://localhost:4001/proxy?url=https://search.brave.com/serp/v3/"
        // So, unproxify(window.location.href) should be "https://search.brave.com/serp/v3/"
        const currentUnproxifiedLocation = unproxify(window.location.href);
        console.log('DEBUG: Current Unproxified Location:', currentUnproxifiedLocation);


        // Override import.meta.resolve
        import.meta.resolve = function(specifier) {
            let originalResolvedUrl;

            // Determine the original base URL of the *current module* that's doing the import.
            // This is needed because 'nativeResolve' uses 'import.meta.url' as its base,
            // and 'import.meta.url' itself will be proxied after our initial override.
            const currentModuleOriginalUrl = unproxify(import.meta.url);

            try {
                // Rule 1: If the specifier is already an absolute URL (e.g., "https://cdn.example.com/lib.js")
                if (specifier.startsWith('http://') || specifier.startsWith('https://') || specifier.startsWith('//')) {
                    originalResolvedUrl = specifier;
                }
                // Rule 2: If the specifier is an absolute path (e.g., "/scripts/module.js")
                else if (specifier.startsWith('/')) {
                    // Resolve it against the original domain of the current page.
                    // This relies on 'window.location.href' giving us the proxied URL,
                    // which we then unproxify to get the original page's base.
                    const originalPageBaseOrigin = new URL(unproxify(window.location.href)).origin;
                    originalResolvedUrl = new URL(specifier, originalPageBaseOrigin + '/').href;
                }
                // Rule 3: If the specifier is a relative path (e.g., "./module.js", "../parent/file.js")
                // or a bare specifier (e.g., "lodash").
                // For relative paths, 'nativeResolve' works relative to 'import.meta.url'.
                // Since 'import.meta.url' itself is (after the second override) a proxied URL,
                // 'nativeResolve' will produce a proxied URL. We then unproxify that.
                else {
                    const nativelyResolvedProxiedUrl = nativeResolve(specifier);
                    originalResolvedUrl = unproxify(nativelyResolvedProxiedUrl);
                }
            } catch (e) {
                console.error('Proxy Client Script: Error resolving specifier:', specifier, e);
                // Fallback: If resolution fails, assume the specifier itself is the original URL
                // or that it's a bare specifier that might not resolve to a standard URL.
                originalResolvedUrl = specifier;
            }

            // Finally, return the *proxified* version of the original resolved URL.
            return proxify(originalResolvedUrl);
        };

        // --- Crucial Step: Re-evaluate import.meta.url ---
        // After overriding 'import.meta.resolve', we must update 'import.meta.url' itself.
        // This ensures that any *subsequent* relative imports or resolutions within this
        // *same module* will now correctly use the proxified base URL for 'import.meta.url'.
        import.meta.url = import.meta.resolve(import.meta.url);
    } else {
        console.warn('Proxy Client Script: import.meta.resolve not found or cannot be overridden. Module imports might fail as expected.');
    }
})();

`;
