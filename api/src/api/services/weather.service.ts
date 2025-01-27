import { Context } from "elysia";

// GET - /weather
export const handleGetWeather = async (ctx: Context) => {
  const lat = ctx.query?.["lat"] || "1";
  const lon = ctx.query?.["lon"] || "1";
  const units = ctx.query?.["units"] || "metric";

  const OPEN_WEATHER_URL = process.env.OPEN_WEATHER_URL;
  const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

  const res = await fetch(
    `${OPEN_WEATHER_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${OPEN_WEATHER_API_KEY}&units=${units}`
  );

  const resData = await res.json();

  return resData;
};
