(function() {
    const PROXY_BASE = '${proxyBaseUrl}';
    const TARGET_DOMAIN = '${targetDomain}';
    
    const __ss_get_resolve = (originalResolve) => {
      return function(specifier, parent) {
        try {
          // Call original resolve first
          const resolvedUrl = originalResolve ? 
            originalResolve.call(this, specifier, parent) : 
            new URL(specifier, parent || import.meta.url).href;
          
          // Check if URL should be proxied
          if (shouldProxy(resolvedUrl)) {
            const proxiedUrl = PROXY_BASE + '?url=' + encodeURIComponent(resolvedUrl);
            console.log('Proxying module:', specifier, '->', proxiedUrl);
            return proxiedUrl;
          }
          
          return resolvedUrl;
        } catch (error) {
          console.error('Module resolution error:', error);
          // Fallback: try to construct URL manually
          try {
            const fallbackUrl = new URL(specifier, parent || import.meta.url).href;
            return shouldProxy(fallbackUrl) ? 
              PROXY_BASE + '?url=' + encodeURIComponent(fallbackUrl) : 
              fallbackUrl;
          } catch (fallbackError) {
            throw error; // Re-throw original error
          }
        }
      };
    };
    
    const shouldProxy = (url) => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes(TARGET_DOMAIN) || 
               urlObj.hostname.includes('brave.com');
      } catch {
        return false;
      }
    };
    
    // Override import.meta.resolve if available
    if (typeof import !== 'undefined' && import.meta && import.meta.resolve) {
      const originalResolve = import.meta.resolve;
      import.meta.resolve = __ss_get_resolve(originalResolve.bind(import.meta));
      
      // Update import.meta.url to be resolved through proxy
      try {
        import.meta.url = import.meta.resolve(import.meta.url);
      } catch (e) {
        // If resolve fails, keep original URL
      }
    }
  })();