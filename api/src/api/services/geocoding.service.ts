import type { Context } from "elysia";

// GET - /geocoding
export const handleGetGeocoding = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);

  const location = searchParams.get("location") || "New York";

  const OPEN_WEATHER_URL = process.env.OPEN_WEATHER_URL;
  const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

  try {
    // -----------------------------------------------------------------------
    // Handle OpenWeatherMap Geocoding
    // -----------------------------------------------------------------------
    const res = await fetch(
      `${OPEN_WEATHER_URL}/geo/1.0/direct?q=${location}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
    );

    const resData = await res.json();

    return {
      error: false,
      message: "Geocoding data from OpenWeatherMap",
      data: resData?.[0] || null,
    };
  } catch (error) {
    ctx.set.status = 400;
    return {
      error: true,
      message: "Error getting geocoding data",
      data: null,
    };
  }
};
