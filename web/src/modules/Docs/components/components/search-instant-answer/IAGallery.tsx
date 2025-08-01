import { useState } from "react";
import {
  Box,
  CloseButton,
  Code,
  Flex,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { DOCS_INSTANT_ANSWERS } from "./data";
import { IAllIAs } from "@ts/search.types";
import classes from "./styles.module.scss";
import DocsText from "../../common/DocsText";
import { KEYWORDS_IA } from "@module/Search/components/components/InstantAnswer/_utils/keywords";
import DocsTitle from "../../common/DocsTitle";

import IACalculator from "@module/Search/components/components/InstantAnswer/components/Calculator";
import IACalendar from "@module/Search/components/components/InstantAnswer/components/Calendar";
import IACoinFlip from "@module/Search/components/components/InstantAnswer/components/CoinFilp";
import IAColorPicker from "@module/Search/components/components/InstantAnswer/components/ColorPicker";
import IACurrency from "@module/Search/components/components/InstantAnswer/components/Currency";
import IADiceRoll from "@module/Search/components/components/InstantAnswer/components/DiceRoll";
import IADownloader from "@module/Search/components/components/InstantAnswer/components/Downloader";
import IAEquation from "@module/Search/components/components/InstantAnswer/components/Equation";
import IAIP from "@module/Search/components/components/InstantAnswer/components/IP";
import IALyrics from "@module/Search/components/components/InstantAnswer/components/Lyrics";
import IAPassword from "@module/Search/components/components/InstantAnswer/components/Password";
import IARNG from "@module/Search/components/components/InstantAnswer/components/RNG";
import IAStopwatch from "@module/Search/components/components/InstantAnswer/components/Stopwatch";
import IATicTacToe from "@module/Search/components/components/InstantAnswer/components/TicTacToe";
import IATimeIn from "@module/Search/components/components/InstantAnswer/components/TimeIn";
import IATimer from "@module/Search/components/components/InstantAnswer/components/Timer";
import IATimeZone from "@module/Search/components/components/InstantAnswer/components/TimeZone";
import IATranslate from "@module/Search/components/components/InstantAnswer/components/Translate";
import IAUnit from "@module/Search/components/components/InstantAnswer/components/Unit";
import IAUUID from "@module/Search/components/components/InstantAnswer/components/UUID";
import IAWeather from "@module/Search/components/components/InstantAnswer/components/Weather";
import { IconArrowsShuffle, IconClock, IconDeviceGamepad3, IconWorld } from "@tabler/icons-react";
import clsx from "clsx";
import { getIconStyle } from "@utils/functions/iconStyle";

const IAGallery = () => {
  const theme = useMantineTheme();
  const [selected, setSelected] = useState<IAllIAs | "">("");

  // Listed all instant answers
  const items = Object.keys(DOCS_INSTANT_ANSWERS).map((ia_key) => {
    const ia = DOCS_INSTANT_ANSWERS[ia_key as IAllIAs];

    const colorParts = ia.color.split(".");
    const colorName = colorParts[0];
    const shade = parseInt(colorParts?.[1] || "6");

    return (
      <UnstyledButton
        key={ia.title}
        className={classes.ia_item}
        onClick={() => setSelected(ia_key as IAllIAs)}
      >
        <ia.icon color={theme.colors[colorName][shade]} size={32} />

        <Text size="xs" fw="bold" mt={7}>
          {ia.title_short}
        </Text>
      </UnstyledButton>
    );
  });

  // Display selected IA info
  const selectedIA = selected && DOCS_INSTANT_ANSWERS[selected];

  return (
    <>
      {/* No Selected IA - gallery */}
      {!selectedIA && (
        <Flex className={classes.ia_gallery} mt="lg">
          {items}
        </Flex>
      )}

      {/* No Selected IA - all groups/shared */}
      {!selectedIA && (
        <Stack>
          <DocsText>
            Some similar instant answers are grouped together when displayed in /search
          </DocsText>

          <Flex align="center" gap="sm">
            <IconClock color={theme.colors.yellow[5]} />

            <Text>Group - Clock ( Timer, Stopwatch )</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <IconArrowsShuffle color={theme.colors.green[5]} />

            <Text>Group - Converter ( Unit, Currency )</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <IconDeviceGamepad3 color={theme.colors.red[5]} />

            <Text>Group - Games ( Coin Flip, Dice Roll, TicTacToe )</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <IconWorld color={theme.colors.cyan[5]} />

            <Text>Group - Global Time ( Time In, Time Zone )</Text>
          </Flex>
        </Stack>
      )}

      {/* Selected IA - title */}
      {selectedIA && (
        <Flex align="center" justify="space-between" mt="md">
          <DocsTitle>{`IA - ${selectedIA.title}`}</DocsTitle>

          <CloseButton size="lg" c="red" onClick={() => setSelected("")} />
        </Flex>
      )}

      {/* Display selected IA component */}
      {selected === "calculator" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.calculator.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IACalculator />
          </Box>
        </>
      ) : selected === "calendar" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.calendar.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IACalendar />
          </Box>
        </>
      ) : selected === "coin_flip" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.coin_flip.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IACoinFlip withIAWrapper />
          </Box>
        </>
      ) : selected === "color_picker" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.color_picker.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAColorPicker withIAWrapper />
          </Box>
        </>
      ) : selected === "currency" ? (
        <>
          <DocsText>
            Condition: Search query contains any currency code, ex. <Code>EUR to USD</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IACurrency currency1="usd" currency2="eur" withIAWrapper />
          </Box>
        </>
      ) : selected === "dice_roll" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.dice_roll.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IADiceRoll withIAWrapper />
          </Box>
        </>
      ) : selected === "downloader" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.downloader.slice(0, 4).join(", ")}, etc.</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IADownloader />
          </Box>
        </>
      ) : selected === "equation" ? (
        <>
          <DocsText>
            Condition:{" "}
            <Code>{`/(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/`}</Code>, the
            search query needs to be an equation
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAEquation query="6 * ( 2 + 7 )" />
          </Box>
        </>
      ) : selected === "ip" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.ip.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAIP />
          </Box>
        </>
      ) : selected === "lyrics" ? (
        <>
          <DocsText>
            Condition: Query contains word <Code>lyrics</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IALyrics initialQ="rick astley never gonna give you up lyrics" />
          </Box>
        </>
      ) : selected === "password" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.password.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAPassword />
          </Box>
        </>
      ) : selected === "rng" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.rng.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IARNG />
          </Box>
        </>
      ) : selected === "stopwatch" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.stopwatch.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAStopwatch withIAWrapper />
          </Box>
        </>
      ) : selected === "tictactoe" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.tictactoe.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IATicTacToe withIAWrapper />
          </Box>
        </>
      ) : selected === "time_in" ? (
        <>
          <DocsText>
            Condition: <Code>{`query.includes("time in")`}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IATimeIn withIAWrapper location="Paris" />
          </Box>
        </>
      ) : selected === "time_zone" ? (
        <>
          <DocsText>
            Condition: <Code>{KEYWORDS_IA.time_zone.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IATimeZone withIAWrapper />
          </Box>
        </>
      ) : selected === "timer" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.timer.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IATimer withIAWrapper />
          </Box>
        </>
      ) : selected === "translate" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.translate.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IATranslate />
          </Box>
        </>
      ) : selected === "unit" ? (
        <>
          <DocsText>
            Condition: Search query contains any measurement unit, ex. <Code>m to km</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAUnit type="length" unit1="m" unit2="cm" withIAWrapper />
          </Box>
        </>
      ) : selected === "uuid" ? (
        <>
          <DocsText>
            Keywords: <Code>{KEYWORDS_IA.uuid.join(", ")}</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAUUID />
          </Box>
        </>
      ) : selected === "weather" ? (
        <>
          <DocsText>
            Condition: Search query starts with <Code>weather</Code>, can also contain location like{" "}
            <Code>weather New York</Code>
          </DocsText>
          <Box mt="xl" className={classes.ia_box}>
            <IAWeather propLocation="New York" />
          </Box>
        </>
      ) : null}
    </>
  );
};

export default IAGallery;
