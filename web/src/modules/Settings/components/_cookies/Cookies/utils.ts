export const decompressSearxngHash = async (
  hash: string,
): Promise<{ data: any; isValid: boolean }> => {
  const base64 = hash.replace(/-/g, "+").replace(/_/g, "/");

  const binaryString = atob(base64);

  const bytes = Uint8Array.from(binaryString, (m) => m.charCodeAt(0));

  const ds = new DecompressionStream("deflate");
  console.log(`ds: ${ds}`);

  const writer = ds.writable.getWriter();
  writer.write(bytes);
  writer.close();

  const response = new Response(ds.readable);
  const queryString = await response.text();

  const params = new URLSearchParams(queryString);

  const hasRequiredKeys = params?.has("categories") && params?.has("enabled_engines");
  if (!hasRequiredKeys) return { data: null, isValid: false };

  // Convert url params to object
  const prefs: Record<string, any> = {};
  for (const [key, value] of params.entries()) {
    if (value === "True") prefs[key] = true;
    else if (value === "False") prefs[key] = false;
    else if (!isNaN(Number(value)) && value !== "") prefs[key] = Number(value);
    else prefs[key] = value;
  }

  return { data: prefs, isValid: true };
};
