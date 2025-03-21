import type {
  IOpenMeteoCurrentWeather,
  IOpenMeteoDaily,
  IOpenMeteoHourly,
  IOpenMeteoResponse,
} from "../../../types/openmeteo.types";
import type {
  IOpenWeatherCurrent,
  IOpenWeatherDaily,
  IOpenWeatherHourly,
  IOpenWeatherResponse,
} from "../../../types/openweather.types";

/**
 * Convert Open-Meteo response to OpenWeatherMap OneCall format
 *
 * @param {Object} data - Open-Meteo API response
 * @param {number} lat - Latitude used in request
 * @param {number} lon - Longitude used in request
 * @returns {Object} - Data in OpenWeatherMap format
 */
export const convertOMToOWMFormat = (
  data: IOpenMeteoResponse,
  lat: number,
  lon: number
): IOpenWeatherResponse | null => {
  // Handle missing data gracefully
  if (!data || !data.current_weather || !data.hourly || !data.daily) {
    return null;
  }

  // Create OWM-style response object
  return {
    lat,
    lon,
    timezone: data.timezone,
    timezone_offset: data.utc_offset_seconds || 0,
    current: formatCurrentWeather(data.current_weather),
    hourly: formatHourlyWeather(data.hourly),
    daily: formatDailyWeather(data.daily),
  };
};

/**
 * Format current weather data to match OWM format
 *
 * @param {Object} current - Open-Meteo current weather data
 * @returns {Object} - Formatted current weather
 */
function formatCurrentWeather(current: IOpenMeteoCurrentWeather): IOpenWeatherCurrent {
  const unixTime = Math.floor(new Date(current.time).getTime() / 1000);

  return {
    dt: unixTime,
    sunrise: 0, // Added from daily data later
    sunset: 0, // Added from daily data later
    temp: current.temperature,
    feels_like: current?.apparent_temperature || current.temperature,
    pressure: 0, // current?.pressure_msl,
    humidity: 0, // current.relative_humidity_2m,
    dew_point: 0, // Not directly available in current
    uvi: 0, // Not directly available in current
    clouds: 0, // current?.cloud_cover,
    visibility: 10000, // Default value, not directly available in current
    wind_speed: current.windspeed,
    wind_deg: 0, // current.wind_direction_10m,
    wind_gust: 0, // current.wind_gusts_10m,
    weather: [
      {
        id: mapWeatherCodeToOWMId(current.weathercode),
        main: getWeatherMain(current.weathercode),
        description: getWeatherDescription(current.weathercode),
        icon: getWeatherIcon(current.weathercode, current.is_day !== 0),
      },
    ],
    // rain: current.rain ? { "1h": current.rain } : undefined,
    // snow: current.snowfall ? { "1h": current.snowfall } : undefined,
  };
}

/**
 * Format hourly weather data to match OWM format
 *
 * @param {Object} hourlyData - Open-Meteo hourly weather data
 * @returns {Array} - Formatted hourly weather array
 */
function formatHourlyWeather(hourlyData: IOpenMeteoHourly): IOpenWeatherHourly[] {
  const hourly = [];

  for (let i = 0; i < hourlyData.time.length; i++) {
    const unixTime = Math.floor(new Date(hourlyData.time[i]).getTime() / 1000);

    hourly.push({
      dt: unixTime,
      temp: hourlyData.temperature_2m[i],
      feels_like: hourlyData.apparent_temperature[i],
      pressure: hourlyData.pressure_msl[i],
      humidity: hourlyData.relative_humidity_2m[i],
      dew_point: hourlyData.dew_point_2m[i],
      uvi: hourlyData.uv_index[i],
      clouds: hourlyData.cloud_cover[i],
      visibility: hourlyData.visibility[i],
      wind_speed: hourlyData.wind_speed_10m[i],
      wind_deg: hourlyData.wind_direction_10m[i],
      wind_gust: hourlyData.wind_gusts_10m[i],
      weather: [
        {
          id: mapWeatherCodeToOWMId(hourlyData.weather_code[i]),
          main: getWeatherMain(hourlyData.weather_code[i]),
          description: getWeatherDescription(hourlyData.weather_code[i]),
          icon: getWeatherIcon(hourlyData.weather_code[i], hourlyData.is_day[i] !== 0),
        },
      ],
      pop: hourlyData.precipitation_probability[i]
        ? hourlyData.precipitation_probability[i] / 100
        : 0,
      rain: hourlyData.rain[i] ? { "1h": hourlyData.rain[i] } : undefined,
      snow: hourlyData.snowfall[i] ? { "1h": hourlyData.snowfall[i] } : undefined,
    });
  }

  return hourly;
}

/**
 * Format daily weather data to match OWM format
 *
 * @param {Object} dailyData - Open-Meteo daily weather data
 * @returns {Array} - Formatted daily weather array
 */
function formatDailyWeather(dailyData: IOpenMeteoDaily): IOpenWeatherDaily[] {
  const daily: IOpenWeatherDaily[] = [];

  for (let i = 0; i < dailyData.time.length; i++) {
    const unixTime = Math.floor(new Date(dailyData.time[i]).getTime() / 1000);
    const sunriseTime = Math.floor(new Date(dailyData.sunrise[i]).getTime() / 1000);
    const sunsetTime = Math.floor(new Date(dailyData.sunset[i]).getTime() / 1000);

    daily.push({
      dt: unixTime,
      sunrise: sunriseTime,
      sunset: sunsetTime,
      moonrise: 0, // Not available in Open-Meteo
      moonset: 0, // Not available in Open-Meteo
      moon_phase: 0, // Not available in Open-Meteo
      temp: {
        day: dailyData.temperature_2m_mean[i],
        min: dailyData.temperature_2m_min[i],
        max: dailyData.temperature_2m_max[i],
        night: dailyData.temperature_2m_min[i], // Approximation
        eve: dailyData.temperature_2m_mean[i], // Approximation
        morn: dailyData.temperature_2m_mean[i], // Approximation
      },
      feels_like: {
        day: dailyData.apparent_temperature_max[i],
        night: dailyData.apparent_temperature_min[i],
        eve: dailyData.apparent_temperature_mean[i], // Approximation
        morn: dailyData.apparent_temperature_mean[i], // Approximation
      },
      pressure: 1013, // Default value, not directly available in daily
      humidity: 70, // Default value, not directly available in daily
      dew_point: 0, // Not available in daily data
      wind_speed: dailyData.wind_speed_10m_max[i],
      wind_gust: dailyData.wind_gusts_10m_max[i],
      wind_deg: dailyData.wind_direction_10m_dominant[i],
      clouds: 0, // Not directly available in daily
      uvi: dailyData.uv_index_max[i],
      pop: dailyData.precipitation_probability_max[i]
        ? dailyData.precipitation_probability_max[i] / 100
        : 0,
      rain: dailyData.rain_sum[i] || 0,
      //   snow: dailyData.snowfall_sum ? dailyData.snowfall_sum[i] : 0,
      summary: "",
      weather: [
        {
          id: mapWeatherCodeToOWMId(dailyData.weather_code[i]),
          main: getWeatherMain(dailyData.weather_code[i]),
          description: getWeatherDescription(dailyData.weather_code[i]),
          icon: getWeatherIcon(dailyData.weather_code[i], true), // Default to day icon
        },
      ],
    });
  }

  // Add sunrise/sunset to current weather if there's daily data
  if (daily.length > 0) {
    return daily;
  }

  return [];
}

/**
 * Map WMO weather code to OpenWeatherMap weather ID
 *
 * @param {number} wmoCode - WMO weather code
 * @returns {number} - Equivalent OpenWeatherMap weather ID
 */
function mapWeatherCodeToOWMId(wmoCode: number) {
  // This is a partial mapping - extend as needed
  const codeMap = {
    0: 800, // Clear sky -> Clear
    1: 801, // Mainly clear -> Few clouds
    2: 802, // Partly cloudy -> Scattered clouds
    3: 804, // Overcast -> Overcast clouds
    45: 741, // Fog -> Fog
    48: 741, // Depositing rime fog -> Fog
    51: 300, // Light drizzle -> Light intensity drizzle
    53: 301, // Moderate drizzle -> Drizzle
    55: 302, // Dense drizzle -> Heavy intensity drizzle
    61: 500, // Slight rain -> Light rain
    63: 501, // Moderate rain -> Moderate rain
    65: 502, // Heavy rain -> Heavy intensity rain
    71: 600, // Slight snow fall -> Light snow
    73: 601, // Moderate snow fall -> Snow
    75: 602, // Heavy snow fall -> Heavy snow
    80: 520, // Slight rain showers -> Light intensity shower rain
    81: 521, // Moderate rain showers -> Shower rain
    82: 522, // Violent rain showers -> Heavy intensity shower rain
    95: 200, // Thunderstorm -> Thunderstorm with light rain
    96: 201, // Thunderstorm with slight hail -> Thunderstorm with rain
    99: 202, // Thunderstorm with heavy hail -> Thunderstorm with heavy rain
  };

  // @ts-ignore
  return codeMap?.[wmoCode] || 800; // Default to clear if no mapping
}

/**
 * Get weather main category from WMO weather code
 *
 * @param {number} wmoCode - WMO weather code
 * @returns {string} - Weather main category
 */
function getWeatherMain(wmoCode: number) {
  if (wmoCode === 0) return "Clear";
  if (wmoCode >= 1 && wmoCode <= 3) return "Clouds";
  if (wmoCode >= 45 && wmoCode <= 48) return "Fog";
  if (wmoCode >= 51 && wmoCode <= 57) return "Drizzle";
  if (wmoCode >= 61 && wmoCode <= 67) return "Rain";
  if (wmoCode >= 71 && wmoCode <= 77) return "Snow";
  if (wmoCode >= 80 && wmoCode <= 82) return "Rain";
  if (wmoCode >= 85 && wmoCode <= 86) return "Snow";
  if (wmoCode >= 95) return "Thunderstorm";
  return "Clear"; // Default
}

/**
 * Get detailed weather description from WMO weather code
 *
 * @param {number} wmoCode - WMO weather code
 * @returns {string} - Weather description
 */
function getWeatherDescription(wmoCode: number) {
  const descriptions = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "fog",
    48: "depositing rime fog",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "dense drizzle",
    56: "light freezing drizzle",
    57: "dense freezing drizzle",
    61: "slight rain",
    63: "moderate rain",
    65: "heavy rain",
    66: "light freezing rain",
    67: "heavy freezing rain",
    71: "slight snow fall",
    73: "moderate snow fall",
    75: "heavy snow fall",
    77: "snow grains",
    80: "slight rain showers",
    81: "moderate rain showers",
    82: "violent rain showers",
    85: "slight snow showers",
    86: "heavy snow showers",
    95: "thunderstorm",
    96: "thunderstorm with slight hail",
    99: "thunderstorm with heavy hail",
  };

  // @ts-ignore
  return descriptions?.[wmoCode] || "clear sky";
}

/**
 * Generate OWM-compatible weather icon code
 *
 * @param {number} wmoCode - WMO weather code
 * @param {number} isDay - 1 for day, 0 for night
 * @returns {string} - OWM icon code
 */
function getWeatherIcon(wmoCode: number, isDay: boolean) {
  const dayTime = isDay ? "d" : "n";

  // Clear
  if (wmoCode === 0) return `01${dayTime}`;

  // Clouds
  if (wmoCode === 1) return `02${dayTime}`;
  if (wmoCode === 2) return `03${dayTime}`;
  if (wmoCode === 3) return `04${dayTime}`;

  // Fog
  if (wmoCode >= 45 && wmoCode <= 48) return `50${dayTime}`;

  // Drizzle
  if (wmoCode >= 51 && wmoCode <= 57) return `09${dayTime}`;

  // Rain
  if (wmoCode >= 61 && wmoCode <= 65) return `10${dayTime}`;
  if (wmoCode === 66 || wmoCode === 67) return `13${dayTime}`;

  // Snow
  if (wmoCode >= 71 && wmoCode <= 77) return `13${dayTime}`;

  // Showers
  if (wmoCode >= 80 && wmoCode <= 82) return `09${dayTime}`;
  if (wmoCode === 85 || wmoCode === 86) return `13${dayTime}`;

  // Thunderstorm
  if (wmoCode >= 95) return `11${dayTime}`;

  return `01${dayTime}`; // Default
}
