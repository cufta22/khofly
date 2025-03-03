import { Context } from "elysia";

// GET - /weather
export const handleGetWeather = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);

  const lat = searchParams.get("lat") || "1";
  const lon = searchParams.get("lon") || "1";

  const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";
  const res = await fetch(
    `${OPEN_METEO_URL}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,`
  );

  const resData = await res.json();

  return resData;
};
