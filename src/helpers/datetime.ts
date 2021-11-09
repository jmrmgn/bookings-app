import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

const today = (): string => moment(Date.now()).format(DATE_FORMAT);

export { today };
