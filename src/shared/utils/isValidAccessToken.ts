export const isValidAccessToken = (expiresAt: number) => {
  return expiresAt > Date.now() + 60000;
};
