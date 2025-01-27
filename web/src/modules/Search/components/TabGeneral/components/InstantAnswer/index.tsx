import {
  shouldDisplayCurrency,
  shouldDisplayDownloader,
  shouldDisplayEquation,
  shouldDisplayIA,
  shouldDisplayUnits,
} from "./_utils";
import { useSettingsStore } from "@store/settings";

import IACoinFlip from "./components/CoinFilp";
import IACalculator from "./components/Calculator";
import IALyrics from "./components/Lyrics";
import IAUUID from "./components/UUID";
import IAWeather from "./components/Weather";
import IACalendar from "./components/Calendar";
import IAPassword from "./components/Password";
import IAEquation from "./components/Equation";

import IANeofetch from "./_commands/Neofetch";

import SharedCurrencyUnit from "./_shared/SharedCurrencyUnit";
import SharedStopwatchTimer from "./_shared/SharedStopwatchTimer";
import { useResponsive } from "@hooks/use-responsive";
import IARNG from "./components/RNG";
import IADownloader from "./components/Downloader";
import useSearchQuery from "@hooks/use-search-query";

const InstantAnswer = () => {
  const isXl = useResponsive("min", "lg", true);

  const useInstantAnswers = useSettingsStore((state) => state.useInstantAnswers);

  const q = useSearchQuery();

  // Instant Answers disabled in settings
  if (!useInstantAnswers) return null;

  // Instant answer - Calculator WIP
  if (shouldDisplayIA(q, ["calculator", "calc"])) return <IACalculator />;

  // Instant answer - Calendar
  if (shouldDisplayIA(q, ["calendar", "cal"])) return <IACalendar />;

  // Instant answer - Coin flip
  if (shouldDisplayIA(q, ["coinflip", "coin flip"])) return <IACoinFlip />;

  // Instant answer - Currency convertor
  const { sdCurr, ...restCurr } = shouldDisplayCurrency(q);
  if (sdCurr) return <SharedCurrencyUnit type="currency" {...restCurr} />;

  // Instant answer - Downloader
  if (shouldDisplayDownloader(q)) return <IADownloader />;

  // Instant answer - Equation
  if (shouldDisplayEquation(q)) return <IAEquation query={q} />;

  // Instant answer - Lyrics by Genius
  if (shouldDisplayIA(q, ["lyrics"]) && !isXl) return <IALyrics />;

  // Instant answer - Password
  if (shouldDisplayIA(q, ["password"])) return <IAPassword />;

  // Instant answer - Password
  if (shouldDisplayIA(q, ["rng", "random number", "random number generator"])) return <IARNG />;

  // Instant answer - Stopwatch
  if (shouldDisplayIA(q, ["stopwatch"])) return <SharedStopwatchTimer type="stopwatch" />;

  // Instant answer - Timer WIP
  if (shouldDisplayIA(q, ["timer", "alarm"])) return <SharedStopwatchTimer type="timer" />;

  // Instant answer - Unit convertor
  const { sdUnit, ...restUnit } = shouldDisplayUnits(q);
  if (sdUnit) return <SharedCurrencyUnit type="unit" {...restUnit} />;

  // Instant answer - UUID
  if (shouldDisplayIA(q, ["uuid"])) return <IAUUID />;

  // Instant answer - Weather by OpenWeather
  if (shouldDisplayIA(q, ["weather", "forecast"])) return <IAWeather />;

  // TODO:
  // Instant answer - Translate WIP
  //if (shouldDisplayIA(query, ["translate"])) return <IATranslate />;
  // Instant answer - Sport scores
  // Instant answer - Time around the world?
  // Instant answer - Lorem ipsum generator

  // Commands for memes

  // IA Command - Neofetch
  if (shouldDisplayIA(q, ["neofetch"])) return <IANeofetch />;

  return null;
};

export default InstantAnswer;
