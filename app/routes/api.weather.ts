import { LoaderFunctionArgs, json as nodeJson } from "@remix-run/node";
import { json as vercelJson } from "@vercel/remix";
import { OpenWeatherResponse } from "src/api/weather/types";

// Change functions based on deployment target
const json = process.env.HOST_TARGET === "vercel" ? vercelJson : nodeJson;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get("lat") || "1";
  const lon = searchParams.get("lon") || "1";
  const units = searchParams.get("units") || "metric";

  const res = await fetch(
    `${process.env.OPEN_WEATHER_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.OPEN_WEATHER_API_KEY}&units=${units}`
  );

  const resData: OpenWeatherResponse = await res.json();

  return json(resData);
};
