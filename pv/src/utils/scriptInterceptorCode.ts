// Script to inject for intercepting dynamic script loading
export const scriptInterceptorCode = `
<script>
  // Save original methods
  const originalCreateElement = document.createElement;
  const originalAppendChild = Node.prototype.appendChild;
  const originalSetAttribute = Element.prototype.setAttribute;
  const originalEval = window.eval;
  const originalFetch = window.fetch;
  const originalXHROpen = XMLHttpRequest.prototype.open;
  
  // Proxy base URL
  const PROXY_BASE = 'http://localhost:/4000/proxy';
  
  // Helper to rewrite URLs
  function rewriteUrl(url) {
    if (!url) return url;
    
    try {
      // Handle relative URLs
      if (url.startsWith('/')) {
        return \`\${PROXY_BASE}/path\${url}\`;
      }
      // Handle absolute URLs
      else if (url.startsWith('http')) {
        return \`\${PROXY_BASE}/resource?url=\${encodeURIComponent(url)}\`;
      }
    } catch (e) {
      console.error('Error rewriting URL:', e);
    }
    return url;
  }
  
  // Override createElement to catch script creation
  document.createElement = function(tagName, options) {
    const element = originalCreateElement.call(document, tagName, options);
    
    if (tagName.toLowerCase() === 'script') {
      // Override the src property
      let originalSrc = '';
      Object.defineProperty(element, 'src', {
        get: function() { return originalSrc; },
        set: function(value) {
          originalSrc = value;
          const newSrc = rewriteUrl(value);
          originalSetAttribute.call(this, 'src', newSrc);
          return newSrc;
        }
      });
    }
    
    if (tagName.toLowerCase() === 'link') {
      // Handle stylesheets
      let originalHref = '';
      Object.defineProperty(element, 'href', {
        get: function() { return originalHref; },
        set: function(value) {
          originalHref = value;
          const newHref = rewriteUrl(value);
          originalSetAttribute.call(this, 'href', newHref);
          return newHref;
        }
      });
    }
    
    return element;
  };
  
  // Override appendChild to catch direct script injection
  Node.prototype.appendChild = function(node) {
    if (node.tagName === 'SCRIPT' && node.src) {
      node.src = rewriteUrl(node.src);
    }
    if (node.tagName === 'LINK' && node.rel === 'stylesheet' && node.href) {
      node.href = rewriteUrl(node.href);
    }
    return originalAppendChild.call(this, node);
  };
  
  // Override setAttribute to catch when src/href is set
  Element.prototype.setAttribute = function(name, value) {
    if ((name === 'src' || name === 'href') && typeof value === 'string') {
      return originalSetAttribute.call(this, name, rewriteUrl(value));
    }
    return originalSetAttribute.call(this, name, value);
  };
  
  // Override fetch
  window.fetch = function(resource, options) {
    if (typeof resource === 'string') {
      resource = rewriteUrl(resource);
    } else if (resource instanceof Request) {
      resource = new Request(
        rewriteUrl(resource.url),
        resource
      );
    }
    return originalFetch.call(this, resource, options);
  };
  
  // Override XMLHttpRequest
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    return originalXHROpen.call(this, method, rewriteUrl(url), async, user, password);
  };
  
  // Override import() - this is trickier as it's a syntax feature
  // This is a simplified approach that won't catch all cases
  window.import = function(url) {
    return import(rewriteUrl(url));
  };
  
  // Monitor and rewrite dynamic script content for eval/new Function
  // Note: This is difficult to do completely as it requires parsing JS
  window.eval = function(code) {
    // Very basic string replacement (not comprehensive)
    let modifiedCode = code;
    try {
      // Try to find and replace URLs in the code
      modifiedCode = code.replace(/(["'])((http(s)?:)?\/\/[^"']+)(["'])/g, function(match, q1, url, p3, p4, q2) {
        return q1 + rewriteUrl(url) + q2;
      });
    } catch (e) {
      console.error('Error rewriting eval code:', e);
    }
    return originalEval.call(window, modifiedCode);
  };
  
  console.log('[Proxy] Script interceptor initialized');
</script>
`;
