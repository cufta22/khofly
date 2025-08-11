import { IAllIAs } from "@ts/search.types";

export const KEYWORDS_IA: { [key in IAllIAs]: string[] } = {
  calculator: ["calculator", "calc"],
  calendar: ["calendar", "cal"],
  coin_flip: ["coinflip", "coin flip"],
  color_picker: ["color picker"],
  days_till_christmas: ["christmas", "till christmas", "days till christmas"],
  dice_roll: ["dice", "dice roll"],
  downloader: [
    "downloader",

    "ytdl",
    "youtube download",
    "yt to mp3",
    "yt to mp4",

    "ig download",
    "ig downloader",
    "instagram download",

    // "tiktok download",
  ],
  ip: ["whats my ip", "what's my ip", "my ip"],
  password: ["random password", "password"],
  rng: ["random number", "rng", "random number generator"],
  stopwatch: ["stopwatch"],
  tictactoe: ["tictactoe", "tic tac toe"],
  timer: ["timer", "alarm"],
  time_zone: ["time zone"],
  translate: ["translate"],
  uuid: ["random uuid", "uuid", "unique id"],

  // Use more complicated logic that keywords
  currency: [],
  equation: [],
  lyrics: [],
  time_in: [],
  unit: [],
  weather: [],
};
