import { IGetEventsQueryParams } from '../types/getEventsQueryParams';
import { IGetVideosFilters } from '../types/IGetVideosFilters';

export function getURLSearchParams(
  params: IGetVideosFilters | IGetEventsQueryParams
) {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlParams.append(key, String(value));
  }
  return urlParams.toString();
}

export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = remainingSeconds.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}:${secondsString}`;
}

export function dateToString(dateStr: Date): string {
  if (!isValidDateString(dateStr)) return '';
  let date = new Date(dateStr);
  return (
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) +
    ' - ' +
    date.toLocaleTimeString('en-US')
  );
}

export function dateToStringDDMMYYYY(date: Date): string {
  return date.toLocaleDateString('en-GB');
}

export function dateToStringShortMonthDateYear(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

function isValidDateString(dateStr: Date): boolean {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

export function tryParseIntOrUndefined(str: string): number | undefined {
  const value = parseInt(str, 10);
  return isNaN(value) ? undefined : value;
}
