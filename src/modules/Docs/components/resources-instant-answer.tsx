import { Box, Code, Container, Text } from "@mantine/core";
import classes from "./styles.module.scss";

import WikiTitle from "./common/WikiTitle";
import WikiSubtitle from "./common/WikiSubtitle";

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

const DocsResourcesInstantAnswer = () => {
  const IAWrapperString = "<IAWrapper />";

  return (
    <Container size="lg" p="xl" pb={100}>
      <WikiTitle>Adding instant answer</WikiTitle>

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

      <WikiSubtitle>All available instant answers</WikiSubtitle>

      <Text mt="md">
        Below is a list of all currently available Instant Answers, some of them
        might still be work in progress but offer enough functionality to still
        be included and be useful. More will be available in the future.
      </Text>

      <WikiTitle>1. Calculator</WikiTitle>
      <Box className={classes.search_box}>
        <IACalculator />
      </Box>

      <WikiTitle>2. Calendar</WikiTitle>
      <Box className={classes.search_box}>
        <IACalendar />
      </Box>

      <WikiTitle>3. Coin Flip</WikiTitle>
      <Box className={classes.search_box}>
        <IACoinFlip />
      </Box>

      <WikiTitle>4. Currency</WikiTitle>
      <Box className={classes.search_box}>
        <IACurrency currency1="usd" currency2="eur" withIAWrapper />
      </Box>

      <WikiTitle>5. Equation</WikiTitle>
      <Box className={classes.search_box}>
        <IAEquation query="6 * ( 2 + 7 )" />
      </Box>

      <WikiTitle>6. Lyrics</WikiTitle>
      <Box className={classes.search_box}>
        <IALyrics initialQ="rick astley never gonna give you up" />
      </Box>

      <WikiTitle>7. Password</WikiTitle>
      <Box className={classes.search_box}>
        <IAPassword />
      </Box>

      <WikiTitle>8. Stopwatch</WikiTitle>
      <Box className={classes.search_box}>
        <IAStopwatch withIAWrapper />
      </Box>

      <WikiTitle>9. Timer</WikiTitle>
      <Box className={classes.search_box}>
        <IATimer withIAWrapper />
      </Box>

      {/* <WikiTitle>9. Translate</WikiTitle>
      <Box className={classes.search_box}>
        <Translate />
      </Box> */}

      <WikiTitle>10. Unit convertor</WikiTitle>
      <Box className={classes.search_box}>
        <IAUnit type="length" unit1="m" unit2="cm" withIAWrapper />
      </Box>

      <WikiTitle>11. Random UUID</WikiTitle>
      <Box className={classes.search_box}>
        <IAUUID />
      </Box>

      <WikiTitle>12. Weather</WikiTitle>
      <Box className={classes.search_box}>
        <IAWeather />
      </Box>
    </Container>
  );
};

export default DocsResourcesInstantAnswer;
