// Extract uuid and asset path from params
// input 1: /25de01fb-e698-4ebe-a376-ca5c691ea71b?url=...
// input 2: /25de01fb-e698-4ebe-a376-ca5c691ea71b/assets/...
// output: { 25de01fb-e698-4ebe-a376-ca5c691ea71b, /assets/... }

export const extractAssetParams = (params: string) => {
  const slashIndex = params.indexOf("/");
  let targetAssetUUID = "";
  let targetAssetPath = "";

  if (slashIndex !== -1) {
    targetAssetUUID = params.substring(0, slashIndex);
    targetAssetPath = params.substring(slashIndex); // Includes the leading slash
  } else {
    targetAssetUUID = params;
    targetAssetPath = ""; // Correctly set to empty string if no slash
  }

  return { targetAssetUUID, targetAssetPath };
};
