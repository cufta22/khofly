import { Box, Code, Container, Text } from "@mantine/core";
import classes from "./styles.module.scss";

import DocsTitle from "./common/DocsTitle";
import DocsSubtitle from "./common/DocsSubtitle";

import IACalculator from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Calculator";
import IACoinFlip from "@module/Search/components/TabGeneral/components/InstantAnswer/components/CoinFilp";
import IALyrics from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Lyrics";
import IATimer from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Timer";
import IATranslate from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Translate";
import IAUUID from "@module/Search/components/TabGeneral/components/InstantAnswer/components/UUID";
import IAWeather from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Weather";
import IACalendar from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Calendar";
import IAStopwatch from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Stopwatch";
import IACurrency from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Currency";
import IAPassword from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Password";
import IAUnit from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Unit";
import IAEquation from "@module/Search/components/TabGeneral/components/InstantAnswer/components/Equation";
import ScrollToTop from "@components/ScrollToTop";

const DocsSearchInstantAnswer = () => {
  const IAWrapperString = "<IAWrapper />";

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle>Adding instant answer</DocsTitle>

      <Text mt="md">
        All instant answers code is located in{" "}
        <Code>
          /src/modules/Search/components/TabGeneral/components/InstantAnswer
        </Code>
      </Text>
      <Text mt="md">
        Create a folder with a descriptive name and make sure that everything is
        wrapped with <Code>{IAWrapperString}</Code>, then add your logic for
        displaying Instant Answer in <Code>index.tsx</Code> similar to how
        others are displayed conditionally.
      </Text>

      <DocsSubtitle>All available instant answers</DocsSubtitle>

      <Text mt="md">
        Below is a list of all currently available Instant Answers, some of them
        might still be work in progress but offer enough functionality to still
        be included and be useful. More will be available in the future.
      </Text>

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
        <IACoinFlip />
      </Box>

      <DocsTitle>4. Currency converter</DocsTitle>
      <Box className={classes.search_box}>
        <IACurrency currency1="usd" currency2="eur" withIAWrapper />
      </Box>

      <DocsTitle>5. Equation</DocsTitle>
      <Box className={classes.search_box}>
        <IAEquation query="6 * ( 2 + 7 )" />
      </Box>

      <DocsTitle>6. Lyrics</DocsTitle>
      <Box className={classes.search_box}>
        <IALyrics initialQ="rick astley never gonna give you up" />
      </Box>

      <DocsTitle>7. Password</DocsTitle>
      <Box className={classes.search_box}>
        <IAPassword />
      </Box>

      <DocsTitle>8. Stopwatch</DocsTitle>
      <Box className={classes.search_box}>
        <IAStopwatch withIAWrapper />
      </Box>

      <DocsTitle>9. Timer</DocsTitle>
      <Box className={classes.search_box}>
        <IATimer withIAWrapper />
      </Box>

      {/* <DocsTitle>9. Translate</DocsTitle>
      <Box className={classes.search_box}>
        <Translate />
      </Box> */}

      <DocsTitle>10. Unit converter</DocsTitle>
      <Box className={classes.search_box}>
        <IAUnit type="length" unit1="m" unit2="cm" withIAWrapper />
      </Box>

      <DocsTitle>11. Random UUID</DocsTitle>
      <Box className={classes.search_box}>
        <IAUUID />
      </Box>

      <DocsTitle>12. Weather</DocsTitle>
      <Box className={classes.search_box}>
        <IAWeather />
      </Box>

      <ScrollToTop />
    </Container>
  );
};

export default DocsSearchInstantAnswer;
