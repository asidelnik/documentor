import { GetEventsQueryParams } from '../types/getEventsQueryParams';
import { GetVideosQueryParams } from '../types/getVideosQueryParams';

export function getURLSearchParams(
  params: GetVideosQueryParams | GetEventsQueryParams
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

export function dateToString(date: Date): string {
  if (!isValidDate(date)) return '';
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

function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function tryParseIntOrUndefined(str: string): number | undefined {
  const value = parseInt(str, 10);
  return isNaN(value) ? undefined : value;
}