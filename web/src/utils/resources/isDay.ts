import dayjs from 'dayjs';

const time = dayjs().format('HH');
export const IS_DAY = Number.parseInt(time, 10) > 8 && Number.parseInt(time, 10) < 21;
export const getIsDay = () => Number.parseInt(time, 10) > 8 && Number.parseInt(time, 10) <= 21;
