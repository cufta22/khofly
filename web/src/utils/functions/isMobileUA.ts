export const isMobileUserAgent = (userAgent: string) => {
  if (!userAgent) return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent);
};
