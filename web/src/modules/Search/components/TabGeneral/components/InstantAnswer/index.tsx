import {
  shouldDisplayCowsay,
  shouldDisplayCurrency,
  shouldDisplayEquation,
  shouldDisplayIA,
  shouldDisplayIAExact,
  shouldDisplayTimeIn,
  shouldDisplayUnits,
  shouldDisplayWeather,
} from "./_utils";
import { useSettingsStore } from "@store/settings";

import IACalculator from "./components/Calculator";
import IAUUID from "./components/UUID";
import IAWeather from "./components/Weather";
import IACalendar from "./components/Calendar";
import IAPassword from "./components/Password";
import IAEquation from "./components/Equation";
import IARNG from "./components/RNG";
import IADownloader from "./components/Downloader";
import IALyrics from "./components/Lyrics";

import IANeofetch from "./_commands/Neofetch";

import SharedConverter from "./_shared/SharedConverter";
import SharedClock from "./_shared/SharedClock";
import SharedGlobalTime from "./_shared/SharedGlobalTime";
import SharedGames from "./_shared/SharedGames";

import useSearchQuery from "@hooks/use-search-query";
import { KEYWORDS_IA } from "./_utils/keywords";
import IAIP from "./components/IP";
import IATranslate from "./components/Translate";
import { useResponsive } from "@hooks/use-responsive";
import IACowsay from "./_commands/Cowsay";

const InstantAnswer = () => {
  const isLg = useResponsive("min", "lg", true);

  const useInstantAnswers = useSettingsStore((state) => state.useInstantAnswers);

  const q = useSearchQuery();

  // Instant Answers disabled in settings
  if (!useInstantAnswers) return null;

  // Instant answer - Calculator WIP
  if (shouldDisplayIAExact(q, KEYWORDS_IA.calculator)) return <IACalculator />;

  // Instant answer - Calendar
  if (shouldDisplayIAExact(q, KEYWORDS_IA.calendar)) return <IACalendar />;

  // Instant answer - Coin flip
  if (shouldDisplayIAExact(q, KEYWORDS_IA.coin_flip)) return <SharedGames type="coinflip" />;

  // Instant answer - Currency convertor
  const { sdCurr, ...restCurr } = shouldDisplayCurrency(q);
  if (sdCurr) return <SharedConverter type="currency" {...restCurr} />;

  // Instant answer - Dice Roll
  if (shouldDisplayIAExact(q, KEYWORDS_IA.dice_roll)) return <SharedGames type="diceroll" />;

  // Instant answer - Downloader
  if (shouldDisplayIA(q, KEYWORDS_IA.downloader)) return <IADownloader />;

  // Instant answer - Equation
  if (shouldDisplayEquation(q)) return <IAEquation query={q} />;

  // Instant answer - IP
  if (shouldDisplayIAExact(q, KEYWORDS_IA.ip)) return <IAIP />;

  // Instant answer - Lyrics by genius
  if (shouldDisplayIA(q, ["lyrics"]) && !isLg) return <IALyrics />;

  // Instant answer - Password
  if (shouldDisplayIAExact(q, KEYWORDS_IA.password)) return <IAPassword />;

  // Instant answer - Random number generator
  if (shouldDisplayIAExact(q, KEYWORDS_IA.rng)) return <IARNG />;

  // Instant answer - Stopwatch
  if (shouldDisplayIAExact(q, KEYWORDS_IA.stopwatch)) return <SharedClock type="stopwatch" />;

  // Instant answer - TicTacToe
  if (shouldDisplayIAExact(q, KEYWORDS_IA.tictactoe)) return <SharedClock type="stopwatch" />;

  // Instant answer - Time In
  const { sdTimeIn, location } = shouldDisplayTimeIn(q);
  if (sdTimeIn) return <SharedGlobalTime type="time_in" location={location} />;

  // Instant answer - Timer WIP
  if (shouldDisplayIAExact(q, KEYWORDS_IA.timer)) return <SharedClock type="timer" />;

  // Instant answer - Translate WIP
  if (shouldDisplayIAExact(q, KEYWORDS_IA.translate)) return <IATranslate />;

  // Instant answer - Unit convertor
  const { sdUnit, ...restUnit } = shouldDisplayUnits(q);
  if (sdUnit) return <SharedConverter type="unit" {...restUnit} />;

  // Instant answer - UUID
  if (shouldDisplayIAExact(q, KEYWORDS_IA.uuid)) return <IAUUID />;

  // Instant answer - Weather by OpenWeatherMap | Open-Meteo
  const { sdWeather, ...restWeather } = shouldDisplayWeather(q);
  if (sdWeather) return <IAWeather {...restWeather} />;

  // TODO:
  // Instant answer - Sport scores ?
  // Instant answer - Time zone conversion
  // Instant answer - Lorem ipsum generator

  // Commands for memes

  // IA Command - Neofetch  | X mobile
  if (shouldDisplayIAExact(q, ["neofetch"])) return <IANeofetch />;

  // IA Command - Cowsay
  const { sdCowsay, ...restCowsay } = shouldDisplayCowsay(q);
  if (sdCowsay) return <IACowsay {...restCowsay} />;

  return null;
};

export default InstantAnswer;
