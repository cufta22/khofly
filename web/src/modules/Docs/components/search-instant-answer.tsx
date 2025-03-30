import { Box, Code, Container, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";

import DocsTitle from "./common/DocsTitle";
import DocsSubtitle from "./common/DocsSubtitle";

import ScrollToTop from "@components/ScrollToTop";
import { IconMessageCode } from "@tabler/icons-react";
import DocsText from "./common/DocsText";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";

import IACalculator from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Calculator";
import IACalendar from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Calendar";
import IACoinFlip from "@module/Search/components/TabGeneral/components/InstantAnswer/components/CoinFilp";
import IACurrency from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Currency";
import IADiceRoll from "@module/Search/components/TabGeneral/components/InstantAnswer/components/DiceRoll";
import IADownloader from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Downloader";
import IAEquation from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Equation";
import IALyrics from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Lyrics";
import IAPassword from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Password";
import IARNG from "@module/Search/components/TabGeneral/components/InstantAnswer/components/RNG";
import IAStopwatch from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Stopwatch";
import IATicTacToe from "@module/Search/components/TabGeneral/components/InstantAnswer/components/TicTacToe";
import IATimeIn from "@module/Search/components/TabGeneral/components/InstantAnswer/components/TimeIn";
import IATimer from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Timer";
import IATimeZone from "@module/Search/components/TabGeneral/components/InstantAnswer/components/TimeZone";
import IATranslate from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Translate";
import IAUnit from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Unit";
import IAUUID from "@module/Search/components/TabGeneral/components/InstantAnswer/components/UUID";
import IAWeather from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Weather";
import { KEYWORDS_IA } from "@module/Search/components/TabGeneral/components/InstantAnswer/_utils/keywords";
import IAIP from "@module/Search/components/TabGeneral/components/InstantAnswer/components/IP";

const DocsSearchInstantAnswer = () => {
  const theme = useMantineTheme();

  const IAWrapperString = "<IAWrapper />";

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconMessageCode color={theme.colors.grape[5]} />}>
        Instant Answers
      </DocsTitle>

      <DocsText>
        Instant answers (IA) provide a better user experience by providing direct information
        without the need for user to click on any result. This feature can easily be disabled in
        settings.
      </DocsText>

      <DocsSubtitle>Adding instant answer</DocsSubtitle>

      <DocsText>
        All instant answers code is located in{" "}
        <Code>/src/modules/Search/components/TabGeneral/components/InstantAnswer</Code>
      </DocsText>

      <DocsText>
        Create a folder with a descriptive name and make sure that everything is wrapped with{" "}
        <Code>{IAWrapperString}</Code>, then add your logic for displaying Instant Answer in{" "}
        <Code>index.tsx</Code> similar to how others are displayed conditionally.
      </DocsText>

      <DocsSubtitle>All available instant answers</DocsSubtitle>

      <DocsText>
        Below is a list of all currently available Instant Answers, some of them might still be work
        in progress but offer enough functionality to still be included and be useful. More will be
        available in the future.
      </DocsText>

      <DocsTitle>1. Calculator</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.calculator.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IACalculator />
      </Box>

      <DocsTitle>2. Calendar</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.calendar.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IACalendar />
      </Box>

      <DocsTitle>3. Coin Flip</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.coin_flip.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IACoinFlip withIAWrapper />
      </Box>

      <DocsTitle>4. Currency Converter</DocsTitle>
      <DocsText>
        Condition: Search query contains any currency code, ex. <Code>EUR to USD</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IACurrency currency1="usd" currency2="eur" withIAWrapper />
      </Box>

      <DocsTitle>5. Dice Roll</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.dice_roll.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IADiceRoll withIAWrapper />
      </Box>

      <DocsTitle>6. Downloader</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.downloader.slice(0, 4).join(", ")}, etc.</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IADownloader />
      </Box>

      <DocsTitle>7. Equation</DocsTitle>
      <DocsText>
        Condition: <Code>{`/(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/`}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IAEquation query="6 * ( 2 + 7 )" />
      </Box>

      <DocsTitle>8. What's my IP</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.ip.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IAIP />
      </Box>

      <DocsTitle>9. Lyrics</DocsTitle>
      <DocsText>
        Condition: Query contains word <Code>lyrics</Code>
      </DocsText>
      <Box className={classes.search_box}>
        <IALyrics initialQ="rick astley never gonna give you up lyrics" />
      </Box>

      <DocsTitle>10. Password</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.password.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IAPassword />
      </Box>

      <DocsTitle>11. RNG</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.rng.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IARNG />
      </Box>

      <DocsTitle>12. Stopwatch</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.stopwatch.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IAStopwatch withIAWrapper />
      </Box>

      <DocsTitle>13. TicTacToe</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.tictactoe.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IATicTacToe withIAWrapper />
      </Box>

      <DocsTitle>14. Time In</DocsTitle>
      <DocsText>
        Condition: <Code>{`query.includes("time in")`}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IATimeIn withIAWrapper location="Paris" />
      </Box>

      <DocsTitle>15. Timer</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.timer.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IATimer withIAWrapper />
      </Box>

      <DocsTitle>16. Time Zone</DocsTitle>
      <DocsText>
        Condition: <Code>{KEYWORDS_IA.time_zone.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IATimeZone withIAWrapper />
      </Box>

      <DocsTitle>17. Translate</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.translate.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IATranslate />
      </Box>

      <DocsTitle>18. Unit converter</DocsTitle>
      <DocsText>
        Condition: Search query contains any measurement unit, ex. <Code>m to km</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IAUnit type="length" unit1="m" unit2="cm" withIAWrapper />
      </Box>

      <DocsTitle>19. Random UUID</DocsTitle>
      <DocsText>
        Keywords: <Code>{KEYWORDS_IA.uuid.join(", ")}</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IAUUID />
      </Box>

      <DocsTitle>20. Weather</DocsTitle>
      <DocsText>
        Condition: Search query starts with <Code>weather</Code>, can also contain location like{" "}
        <Code>weather New York</Code>
      </DocsText>
      <Box mt="md" className={classes.search_box}>
        <IAWeather propLocation="New York" />
      </Box>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["syntax"] }}
        next={{ ...DOCS_CARD_DATA(theme)["AI"] }}
      />

      <ScrollToTop />
    </Container>
  );
};

export default DocsSearchInstantAnswer;
