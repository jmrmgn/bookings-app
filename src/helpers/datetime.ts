import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';
const HALF_HOUR = 30;
const ONE_HOUR = 60;

// TODO: Transfer in .env
const START = '08:00:00';
const END = '17:00:00';

// Get date for today
const today = (): string => moment(Date.now()).format(DATE_FORMAT);

// Check if the schedule is on correct time
const isValidSchedule = (timeRange: { from: string; to: string }): boolean => {
  const startTime = moment(START, TIME_FORMAT);
  const endingTime = moment(END, TIME_FORMAT);

  const isSameOrAfterStart = moment(timeRange?.from, TIME_FORMAT).isSameOrAfter(
    startTime
  );
  const isSameOrBeforeEnd = moment(timeRange?.to, TIME_FORMAT).isSameOrAfter(
    endingTime
  );

  return isSameOrAfterStart && isSameOrBeforeEnd;
};

// Check if the duration is half or 60mins(1 hour)
const isValidTimeDuration = (start: string, end: string): boolean => {
  const startTime = moment(start, TIME_FORMAT);
  const endTime = moment(end, TIME_FORMAT);

  // Check if 30mins or 60mins
  const isHalfHour = endTime.diff(startTime, 'minutes') === HALF_HOUR;
  const isOneHour = endTime.diff(startTime, 'minutes') === ONE_HOUR;

  return isHalfHour || isOneHour;
};

export { today, isValidSchedule, isValidTimeDuration };
