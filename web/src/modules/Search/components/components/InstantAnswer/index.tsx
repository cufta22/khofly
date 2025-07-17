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
import { KEYWORDS_IA } from "./_utils/keywords";
import { useSettingsStore } from "@store/settings";
import useSearchQuery from "@hooks/use-search-query";
import { useResponsive } from "@hooks/use-responsive";

import IACalculator from "./components/Calculator";
import IAColorPicker from "./components/ColorPicker";
import IAUUID from "./components/UUID";
import IAWeather from "./components/Weather";
import IACalendar from "./components/Calendar";
import IAPassword from "./components/Password";
import IAEquation from "./components/Equation";
import IARNG from "./components/RNG";
import IADownloader from "./components/Downloader";
import IALyrics from "./components/Lyrics";
import IAIP from "./components/IP";
import IATranslate from "./components/Translate";

import IANeofetch from "./_commands/Neofetch";
import IACowsay from "./_commands/Cowsay";

import SharedConverter from "./_shared/SharedConverter";
import SharedClock from "./_shared/SharedClock";
import SharedGlobalTime from "./_shared/SharedGlobalTime";
import SharedGames from "./_shared/SharedGames";

const InstantAnswer = () => {
  const isLg = useResponsive("min", "lg", true);

  const hydrated = useSettingsStore((state) => state.hydrated);
  const instantAnswers = useSettingsStore((state) => state.instantAnswers);

  const q = useSearchQuery();

  // Instant Answers disabled in settings
  if (!hydrated || !instantAnswers.enabled) return null;

  // Instant answer - Calculator WIP
  if (shouldDisplayIAExact(q, KEYWORDS_IA.calculator)) return <IACalculator />;

  // Instant answer - Calendar
  if (shouldDisplayIAExact(q, KEYWORDS_IA.calendar)) return <IACalendar />;

  // Instant answer - Coin flip
  if (shouldDisplayIAExact(q, KEYWORDS_IA.coin_flip)) return <SharedGames type="coinflip" />;

  // Instant answer - Color Picker
  if (shouldDisplayIAExact(q, KEYWORDS_IA.color_picker)) return <IAColorPicker withIAWrapper />;

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

  // Instant answer - Time In
  if (shouldDisplayIAExact(q, KEYWORDS_IA.time_zone))
    return <SharedGlobalTime type="time_zone" location="Paris" />;

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
