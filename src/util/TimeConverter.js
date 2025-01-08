import moment from 'moment-timezone';

const FULL_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TIME_FORMAT = 'HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const MY_TIMEZONE = 'Asia/Jayapura';

/**
 * Return full time, e.g.: 2020-12-31 23:59:59
 * @param date
 * @returns {string}
 */
export const fullTime = (date) => moment(date).tz(MY_TIMEZONE).format(FULL_FORMAT);

/**
 * Only time, e.g.: 23:59:59
 * @param date
 * @returns {string}
 */
export const onlyTime = (date) => moment(date).tz(MY_TIMEZONE).format(TIME_FORMAT);

/**
 * Only date, e.g.: 2020-12-31
 * @param date
 * @returns {string}
 */
export const onlyDate = (date) => moment(date).tz(MY_TIMEZONE).format(DATE_FORMAT);
