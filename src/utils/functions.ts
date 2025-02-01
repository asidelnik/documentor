import { IAnalyticsFilters } from '../types/IAnalyticsFilters';
import { IEventsFilters } from '../types/IEventsFilters';
import { ILocationTexts } from '../types/ILocation';
import { IVideosFilters } from '../types/IVideosFilters';

export function getURLSearchParams(
  params: IVideosFilters | IEventsFilters | IAnalyticsFilters
): string {
  const urlParams = new URLSearchParams();

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

  for (const [key, value] of Object.entries(filteredParams)) {
    urlParams.append(key, String(value));
  }
  return urlParams.toString();
}

export function secondsToDurationString(seconds: number | undefined): string {
  if (seconds === undefined || isNaN(seconds) || seconds === 0) return '';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursString = hours > 0 ? `${hours}h ` : '';
  const minutesString = minutes > 0 ? `${minutes}m ` : '';
  const secondsString = remainingSeconds > 0 ? `${remainingSeconds}s` : '';

  return `${hoursString}${minutesString}${secondsString}`.trim();
}

export function dateToString(dateStr: Date): string {
  if (!isValidDateString(dateStr)) return '';
  const date = new Date(dateStr);
  return (
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) +
    '\u00A0\u00A0' +
    date.toLocaleTimeString('en-US')
  );
}

export function dateToStringShortMonthDateYear(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function formatEventLocation(locationTexts: ILocationTexts): string {
  return `${locationTexts.address || ''}${
    locationTexts.address && locationTexts.city ? ', ' : ''
  }${locationTexts.city || ''}`;
}

function isValidDateString(dateStr: Date): boolean {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

// export function tryParseIntOrUndefined(str: string): number | undefined {
//   const value = parseInt(str, 10);
//   return isNaN(value) ? undefined : value;
// }

// export function dateToStringDDMMYYYY(date: Date): string {
//   return date.toLocaleDateString('en-GB');
// }
