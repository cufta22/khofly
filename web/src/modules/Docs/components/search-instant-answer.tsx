import { Box, Code, Container, Text, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";

import DocsTitle from "./common/DocsTitle";
import DocsSubtitle from "./common/DocsSubtitle";

import ScrollToTop from "@components/ScrollToTop";
import { IconMessageCode } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
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

const DocsSearchInstantAnswer = () => {
  const theme = useMantineTheme();

  const IAWrapperString = "<IAWrapper />";

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle
        leftSection={<IconMessageCode style={getIconStyle(48)} color={theme.colors.grape[5]} />}
      >
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
      <Box className={classes.search_box}>
        <IACalculator />
      </Box>

      <DocsTitle>2. Calendar</DocsTitle>
      <Box className={classes.search_box}>
        <IACalendar />
      </Box>

      <DocsTitle>3. Coin Flip</DocsTitle>
      <Box className={classes.search_box}>
        <IACoinFlip withIAWrapper />
      </Box>

      <DocsTitle>4. Currency Converter</DocsTitle>
      <Box className={classes.search_box}>
        <IACurrency currency1="usd" currency2="eur" withIAWrapper />
      </Box>

      <DocsTitle>5. Dice Roll</DocsTitle>
      <Box className={classes.search_box}>
        <IADiceRoll withIAWrapper />
      </Box>

      <DocsTitle>6. Downloader</DocsTitle>
      <Box className={classes.search_box}>
        <IADownloader />
      </Box>

      <DocsTitle>7. Equation</DocsTitle>
      <Box className={classes.search_box}>
        <IAEquation query="6 * ( 2 + 7 )" />
      </Box>

      {/* <DocsTitle>8. Lyrics</DocsTitle>
      <Box className={classes.search_box}>
        <IALyrics initialQ="rick astley never gonna give you up" />
      </Box> */}

      <DocsTitle>8. Password</DocsTitle>
      <Box className={classes.search_box}>
        <IAPassword />
      </Box>

      <DocsTitle>9. Random number generator</DocsTitle>
      <Box className={classes.search_box}>
        <IARNG />
      </Box>

      <DocsTitle>10. Stopwatch</DocsTitle>
      <Box className={classes.search_box}>
        <IAStopwatch withIAWrapper />
      </Box>

      <DocsTitle>11. TicTacToe</DocsTitle>
      <Box className={classes.search_box}>
        <IATicTacToe withIAWrapper />
      </Box>

      <DocsTitle>12. Time In</DocsTitle>
      <Box className={classes.search_box}>
        <IATimeIn withIAWrapper location="Paris" />
      </Box>

      <DocsTitle>13. Timer</DocsTitle>
      <Box className={classes.search_box}>
        <IATimer withIAWrapper />
      </Box>

      <DocsTitle>13. Time Zone</DocsTitle>
      <Box className={classes.search_box}>
        <IATimeZone withIAWrapper location="Paris" />
      </Box>

      {/* <DocsTitle>14. Translate</DocsTitle>
      <Box className={classes.search_box}>
        <Translate />
      </Box> */}

      <DocsTitle>14. Unit converter</DocsTitle>
      <Box className={classes.search_box}>
        <IAUnit type="length" unit1="m" unit2="cm" withIAWrapper />
      </Box>

      <DocsTitle>15. Random UUID</DocsTitle>
      <Box className={classes.search_box}>
        <IAUUID />
      </Box>

      <DocsTitle>16. Weather</DocsTitle>
      <Box className={classes.search_box}>
        <IAWeather />
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
