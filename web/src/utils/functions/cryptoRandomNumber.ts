export const cryptoRandomNumber = (min: number, max: number) => {
  const cryptoRandom = () => {
    try {
      let cryptoRandoms,
        cryptoRandomSlices = [],
        cryptoRandom;
      while ((cryptoRandom = "." + cryptoRandomSlices.join("")).length < 30) {
        // @ts-ignore
        cryptoRandoms = (window.crypto || window.msCrypto).getRandomValues(
          new Uint32Array(5)
        );
        for (let i = 0; i < cryptoRandoms.length; i++) {
          const cryptoRandomSlice = cryptoRandoms[i].toString().slice(1, -1);
          if (cryptoRandomSlice.length > 0)
            cryptoRandomSlices[cryptoRandomSlices.length] = cryptoRandomSlice;
        }
      }
      return Number(cryptoRandom);
    } catch (e) {
      return Math.random();
    }
  };

  if (min > max)
    var temp = max,
      max = min,
      min = temp;
  (min = Math.floor(min)), (max = Math.floor(max));
  return Math.floor(cryptoRandom() * (max - min + 1) + min);
};
