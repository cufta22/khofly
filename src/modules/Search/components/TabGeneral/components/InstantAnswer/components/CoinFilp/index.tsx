import { useEffect, useState } from "react";
import { Center, Paper } from "@mantine/core";

import classes from "./styles.module.scss";
import { IconCampfireFilled, IconMoodSmileFilled } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import clsx from "clsx";
import { cryptoRandomNumber } from "@utils/functions/cryptoRandomNumber";
import { IAWrapper } from "../../wrapper";

const IACoinFlip = () => {
  const [side, setSide] = useState<"heads" | "tails" | "">("");
  const [count, setCount] = useState(0);

  const handleToss = () => {
    setCount(count + 1);
    setSide("");
  };

  useEffect(() => {
    if (!count) return;

    const landedOn = cryptoRandomNumber(0, 1);
    setSide(landedOn === 0 ? "heads" : "tails");
  }, [count]);

  return (
    <IAWrapper>
      <Center className={classes.coin_wrapper} onClick={handleToss}>
        <Paper
          className={clsx(
            classes.coin,
            { [classes.heads_win]: side === "heads" },
            { [classes.tails_win]: side === "tails" }
          )}
          withBorder
        >
          <div className={classes.side_heads}>
            <IconMoodSmileFilled style={getIconStyle(80)} />
          </div>
          <div className={classes.side_tails}>
            <IconCampfireFilled style={getIconStyle(80)} />
          </div>
        </Paper>
      </Center>
    </IAWrapper>
  );
};

export default IACoinFlip;
