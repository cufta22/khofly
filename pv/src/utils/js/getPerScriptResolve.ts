// import.meta.url = __privateView.urlConverter.proxifyUrls(__privateView.urlConverter.unproxifyUrls(import.meta.resolve(import.meta.url)));
// import.meta.url = import.meta.resolve(import.meta.url);

// Injected for individual fetched JS scripts ( only ES modules )
export const getPerScriptResolve = () => {
  return `
  import.meta.resolve = __privateView.getResolve(import.meta.resolve.bind(import.meta));
  import.meta.url = import.meta.resolve(import.meta.url);
    `;
};
