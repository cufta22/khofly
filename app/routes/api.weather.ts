import { OpenWeatherResponse } from "src/api/weather/types";

import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { platformJson } from "app/platform/json";
import { getEnv } from "app/platform/getEnv";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get("lat") || "1";
  const lon = searchParams.get("lon") || "1";
  const units = searchParams.get("units") || "metric";

  const OPEN_WEATHER_URL = getEnv("OPEN_WEATHER_URL", context);
  const OPEN_WEATHER_API_KEY = getEnv("OPEN_WEATHER_API_KEY", context);

  const res = await fetch(
    `${OPEN_WEATHER_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${OPEN_WEATHER_API_KEY}&units=${units}`
  );

  const resData: OpenWeatherResponse = await res.json();

  return platformJson(resData);
};
