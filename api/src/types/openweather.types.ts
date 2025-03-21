export interface IOpenWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: IOpenWeatherCurrent;
  hourly: IOpenWeatherHourly[];
  daily: IOpenWeatherDaily[];
}

export interface IOpenWeatherCurrent {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IOpenWeatherWeather[];
}

export interface IOpenWeatherWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IOpenWeatherHourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeather2[];
  pop: number;
}

export interface IWeather2 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IOpenWeatherDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: ITemp;
  feels_like: IFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeather3[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

export interface ITemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface IFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface IWeather3 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type OpenWeatherCode =
  // Thunderstorm
  | 200
  | 201
  | 202
  | 210
  | 211
  | 212
  | 221
  | 230
  | 231
  | 232
  // Rain
  | 300
  | 301
  | 302
  | 310
  | 311
  | 312
  | 313
  | 314
  | 321
  // Rain
  | 500
  | 501
  | 502
  | 503
  | 504
  | 511
  | 520
  | 521
  | 522
  | 531
  // Snow
  | 600
  | 601
  | 602
  | 611
  | 612
  | 613
  | 615
  | 616
  | 620
  | 621
  | 622
  // Atmosphere
  | 701
  | 711
  | 721
  | 731
  | 741
  | 751
  | 761
  | 762
  | 771
  | 781
  // Clear
  | 800
  // Clouds
  | 801
  | 802
  | 803
  | 804;
