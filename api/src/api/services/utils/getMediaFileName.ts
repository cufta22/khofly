export const getMediaFileName = (): string => {
  const now = new Date();

  // Get components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  // Format as YYYY-MM-DD-HH-mm
  return `${year}-${month}-${day}-${hours}-${minutes}`;
};
