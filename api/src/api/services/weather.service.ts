import type { Context } from "elysia";
import { OPEN_METEO_PARAMS, type IOpenMeteoResponse } from "../../types/openmeteo.types";
import type { IOpenWeatherResponse } from "../../types/openweather.types";
import { convertOMToOWMFormat } from "./utils/weather";

// GET - /weather
export const handleGetWeather = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);

  const lat = searchParams.get("lat") || "1";
  const lon = searchParams.get("lon") || "1";
  const units = searchParams.get("units") || "metric";
  const src = searchParams.get("src") || "own"; // "owm" | "om"

  const OPEN_WEATHER_URL = process.env.OPEN_WEATHER_URL;
  const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

  const OPEN_METEO_URL = process.env.OPEN_METEO_URL;

  try {
    if (src === "owm" && OPEN_WEATHER_URL && OPEN_WEATHER_API_KEY) {
      // -----------------------------------------------------------------------
      // Handle OpenWeatherMap
      // -----------------------------------------------------------------------

      const res = await fetch(
        `${OPEN_WEATHER_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${OPEN_WEATHER_API_KEY}&units=${units}`
      );

      const resData = await res.json();

      return {
        error: false,
        message: "Weather data from OpenWeatherMap",
        data: resData,
      };
    } else if (OPEN_METEO_URL) {
      // -----------------------------------------------------------------------
      // Handle Open Meteo
      // -----------------------------------------------------------------------

      // Parameters for API request
      const params = {
        latitude: lat,
        longitude: lon,
        timezone: "auto",
        forecast_days: 7,
        current_weather: "true",
        current: OPEN_METEO_PARAMS.currentParams.join(","),
        hourly: OPEN_METEO_PARAMS.hourlyParams.join(","),
        daily: OPEN_METEO_PARAMS.dailyParams.join(","),
      };

      const res = await fetch(
        `${OPEN_METEO_URL}/v1/forecast
?latitude=${params.latitude}
&longitude=${params.longitude}
&timezone=${params.timezone}
&forecast_days=${params.forecast_days}
&current_weather=${params.current_weather}
&current=${params.current}
&hourly=${params.hourly}
&daily=${params.daily}
&temperature_unit=${units === "imperial" ? "fahrenheit" : "celsius"}`
      );

      const resData: IOpenMeteoResponse = await res.json();

      // Format it to look like OpenWeather response
      const formattedData: IOpenWeatherResponse | null = convertOMToOWMFormat(
        resData,
        Number.parseFloat(lat),
        Number.parseFloat(lon)
      );

      return {
        error: false,
        message: "Weather data from Open Meteo",
        data: formattedData,
      };
    } else {
      ctx.set.status = 400;
      return {
        error: true,
        message: "Weather API url isn't set up",
      };
    }
  } catch (error) {
    ctx.set.status = 400;
    return {
      error: true,
      message: "Error getting weather data",
    };
  }
};
