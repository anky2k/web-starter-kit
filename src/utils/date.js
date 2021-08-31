import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { trimUpperCase } from './string';

/**
   * [getEpochTime this is to get epoch time relative to current time, this can
   * be addition of subtraction of seconds,minutes,hours,days,months,years
   * basis a positive or negative value respectively]
   * @param  {String} typeOfValue [description]
   * @param  {Number} value   [positive or negative to add or delete the value to current date]
   * @return {[epoch time]}   [description]
   */
export const getEpochTime = (typeOfValue = '', value = 0) => {
  let covertedTime = 0;
  const currentDate = new Date();
  switch (trimUpperCase(typeOfValue)) {
    case 'SECOND':
      covertedTime = (value > 0 ? currentDate.setSeconds(currentDate.getSeconds() + value)
        : currentDate.setSeconds(currentDate.getSeconds() - value));
      break;
    case 'MINUTE':
      covertedTime = (value > 0 ? currentDate.setMinutes(currentDate.getMinutes() + value)
        : currentDate.setMinutes(currentDate.getMinutes() - value));
      break;
    case 'HOUR':
      covertedTime = (value > 0 ? currentDate.setHours(currentDate.getHours() + value)
        : currentDate.setHours(currentDate.getHours() - value));
      break;
    case 'DAY':
      covertedTime = (value > 0 ? currentDate.setDate(currentDate.getDate() + value)
        : currentDate.setDate(currentDate.getDate() - value));
      break;
    case 'MONTH':
      covertedTime = (value > 0 ? currentDate.setMonth(currentDate.getMonth() + value)
        : currentDate.setMonth(currentDate.getMonth() - value));
      break;
    case 'YEAR':
      covertedTime = (value > 0 ? currentDate.setFullYear(currentDate.getFullYear() + value)
        : currentDate.setYear(currentDate.getYear() - value));
      break;
    default:
      covertedTime = new Date().getTime();
      break;
  }
  return covertedTime;
};

export function parseAndFormatDate(dateString, inputFormat = 'dd/MM/yyyy hh:mm a', outputFormat = 'MMM dd yyyy') {
  if (!dateString) return '';
  try {
    const date = parse(dateString, inputFormat, new Date());
    const outputDate = format(date, outputFormat);
    return outputDate;
  } catch (error) {
    return '';
  }
}

export const getStatusSince = (statusDate, t) => {
  // TODO localize static text here with t function
  if (!statusDate) return '';
  const second = 1000;
  const minute = (second * 60);
  const hour = (minute * 60);
  const day = (hour * 24);
  const week = (day * 7);
  const month = (day * 30);
  const year = (month * 12);
  const timeMap = {
    [second]: 'second',
    [minute]: 'minute',
    [hour]: 'hour',
    [day]: 'day',
    [week]: 'week',
    [month]: 'month',
    [year]: 'year'
  };
  const parsedStatusDate = new Date(statusDate * 1000);
  const timeDiff = Math.floor(new Date().getTime() - parsedStatusDate.getTime());
  let lastMatchKey = 0;
  Object.keys(timeMap).some(timeUnit => {
    if (timeUnit > timeDiff) {
      return true;
    }
    lastMatchKey = timeUnit;
    return false;
  });
  const diffNum = Math.floor(timeDiff / lastMatchKey);
  let timeUnit = `${timeMap[lastMatchKey]}${(diffNum > 1 ? 's' : '')}`;
  timeUnit = t(trimUpperCase(timeUnit));
  if (timeMap[lastMatchKey] && timeMap[lastMatchKey] === 'year' && diffNum > 1) {
    return `${t('STATUS_AS_ON')} ${parseAndFormatDate(statusDate)} `;
  }
  return (timeUnit ? `${diffNum} ${timeUnit} ${t('AGO')}` : '');
};

export const getDateDiffSeconds = (d1, d2) => differenceInSeconds(d1, d2);
