import { useResponsive } from "@hooks/use-responsive";

import { useSearchParams } from "@remix-run/react";
import {
  shouldDisplayCurrency,
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
import IANeofetch from "./_commands/Neofetch";
import IAPassword from "./components/Password";

import SharedCurrencyUnit from "./_shared/SharedCurrencyUnit";
import SharedStopwatchTimer from "./_shared/SharedStopwatchTimer";
import IAEquation from "./components/Equation";
import { useSearchStore } from "@store/search";

const InstantAnswer = () => {
  const [searchParams] = useSearchParams();
  const isXl = useResponsive("min", "lg");

  const { searchQuery } = useSearchStore((state) => ({
    searchQuery: state.searchQuery,
  }));
  const { useInstantAnswers } = useSettingsStore((state) => ({
    useInstantAnswers: state.useInstantAnswers,
  }));

  const query = searchQuery || searchParams.get("q") || "";

  // Instant Answers disabled in settings
  if (!useInstantAnswers) return null;

  // Instant answer - Calculator WIP
  if (shouldDisplayIA(query, ["calculator", "calc"])) return <IACalculator />;

  // Instant answer - Calendar
  if (shouldDisplayIA(query, ["calendar", "cal"])) return <IACalendar />;

  // Instant answer - Coin flip
  if (shouldDisplayIA(query, ["coinflip", "coin flip"])) return <IACoinFlip />;

  // Instant answer - Currency convertor
  const { sdCurr, ...restCurr } = shouldDisplayCurrency(query);
  if (sdCurr) return <SharedCurrencyUnit type="currency" {...restCurr} />;

  // Instant answer - Equation
  if (shouldDisplayEquation(query)) return <IAEquation query={query} />;

  // Instant answer - Lyrics by Genius
  if (shouldDisplayIA(query, ["lyrics"]) && !isXl) return <IALyrics />;

  // Instant answer - Password
  if (shouldDisplayIA(query, ["password"])) return <IAPassword />;

  // Instant answer - Stopwatch
  if (shouldDisplayIA(query, ["stopwatch"]))
    return <SharedStopwatchTimer type="stopwatch" />;

  // Instant answer - Timer WIP
  if (shouldDisplayIA(query, ["timer", "alarm"]))
    return <SharedStopwatchTimer type="timer" />;

  // Instant answer - Unit convertor
  const { sdUnit, ...restUnit } = shouldDisplayUnits(query);
  if (sdUnit) return <SharedCurrencyUnit type="unit" {...restUnit} />;

  // Instant answer - UUID
  if (shouldDisplayIA(query, ["uuid"])) return <IAUUID />;

  // Instant answer - Weather by OpenWeather
  if (shouldDisplayIA(query, ["weather", "forecast"])) return <IAWeather />;

  // TODO:
  // Instant answer - Translate WIP
  //if (shouldDisplayIA(query, ["translate"])) return <IATranslate />;
  // Instant answer - Currency convert
  // Instant answer - Generate password
  // Instant answer - Sport scores
  // Instant answer - Time around the world

  // Instant answer - low prio
  // Instant answer - Lorem ipsum generator

  // Commands for memes

  // IA Command - Neofetch
  if (shouldDisplayIA(query, ["neofetch"])) return <IANeofetch />;

  return null;
};

export default InstantAnswer;
