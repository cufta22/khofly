import dayjs from "dayjs";

const time = dayjs().format("HH");
export const IS_DAY = Number.parseInt(time) > 8 && Number.parseInt(time) < 21;
export const getIsDay = (date: number) => Number.parseInt(time) > 8 && Number.parseInt(time) <= 21;
