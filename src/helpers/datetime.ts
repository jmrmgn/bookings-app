import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';
const HALF_HOUR = 30;
const ONE_HOUR = 60;

const START = process.env.REACT_APP_SCHEDULE_START_TIME ?? '08:00:00';
const END = process.env.REACT_APP_SCHEDULE_END_TIME ?? '17:00:00';

// Schedule
const schedule: { start: string; end: string } = { start: START, end: END };

// Get date for today
const today = (): string => moment(Date.now()).format(DATE_FORMAT);

// Check if the time is on correct schedule
const isValidSchedule = (timeRange: { from: string; to: string }): boolean => {
  const startTime = moment(schedule?.start ?? START, TIME_FORMAT);
  const endingTime = moment(schedule?.end ?? END, TIME_FORMAT);

  const isCorrectStart = moment(timeRange?.from, TIME_FORMAT)
    .add(1, 'minutes')
    .isBetween(startTime, endingTime);
  const isCorrectEnd = moment(timeRange?.to, TIME_FORMAT)
    .add(-1, 'minutes')
    .isBetween(startTime, endingTime);

  return isCorrectStart && isCorrectEnd;
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

export { schedule, today, isValidSchedule, isValidTimeDuration };
