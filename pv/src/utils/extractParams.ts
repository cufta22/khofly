// Extract uuid and asset path from params
// input 1: /25de01fb-e698-4ebe-a376-ca5c691ea71b?url=...
// input 2: /25de01fb-e698-4ebe-a376-ca5c691ea71b/assets/...
// output: { 25de01fb-e698-4ebe-a376-ca5c691ea71b, /assets/... }

export const extractParams = (params: string) => {
  const slashIndex = params.indexOf("/");
  let targetUUID = "";
  let targetAssetPath = "";

  if (slashIndex !== -1) {
    targetUUID = params.substring(0, slashIndex);
    targetAssetPath = params.substring(slashIndex); // Includes the leading slash
  } else {
    targetUUID = params;
    targetAssetPath = ""; // Correctly set to empty string if no slash
  }
  return { targetUUID, targetAssetPath };
};
