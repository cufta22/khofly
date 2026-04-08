export const cryptoRandomNumber = (min: number, max: number): number => {
  // Ensure min is less than max
  if (min > max) [min, max] = [max, min];

  // Floor the inputs
  const start = Math.floor(min);
  const end = Math.floor(max);

  const getCryptoRandomFloat = (): number => {
    try {
      // Get a random 32-bit unsigned integer (0 to 4,294,967,295)
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);

      // Divide by (max uint32 + 1) to get a float between [0, 1)
      return array[0] / (0xffffffff + 1);
    } catch {
      // Fallback if crypto is unavailable (e.g., non-secure context)
      return Math.random();
    }
  };

  return Math.floor(getCryptoRandomFloat() * (end - start + 1) + start);
};
