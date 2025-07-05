import { Button } from "@mantine/core";
import { COOL_WEBSITES } from "./data";
import { cryptoRandomNumber } from "@utils/functions/cryptoRandomNumber";

const ButtonRandomSite = () => {
  const handleOpenCoolWebiste = () => {
    const randomIdx = cryptoRandomNumber(0, COOL_WEBSITES.length - 1);

    const luckyOne = COOL_WEBSITES[randomIdx];

    if (luckyOne) window.location.href = luckyOne;
  };

  return (
    <Button
      variant="gradient"
      gradient={{ from: "grape", to: "violet", deg: 90 }}
      onClick={handleOpenCoolWebiste}
    >
      Surprise Me!
    </Button>
  );
};

export default ButtonRandomSite;
