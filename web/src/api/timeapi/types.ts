export interface ITimeAPITimeInResponse {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}

export interface ITimeAPITimeZoneResponse {
  fromTimezone: string;
  fromDateTime: string;
  toTimeZone: string;
  conversionResult: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    seconds: number;
    milliSeconds: number;
    dateTime: string;
    date: string;
    time: string;
    timeZone: string;
    dstActive: boolean;
  };
}
