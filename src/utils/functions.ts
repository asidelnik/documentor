import { statusMap } from '../enums/video-status-enum';
import { IGetEventsQueryParams } from '../types/getEventsQueryParams';
import { GetVideosQueryParams } from '../types/getVideosQueryParams';

export function getURLSearchParams(
  params: GetVideosQueryParams | IGetEventsQueryParams
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

function isValidDateString(dateStr: Date): boolean {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

export function tryParseIntOrUndefined(str: string): number | undefined {
  const value = parseInt(str, 10);
  return isNaN(value) ? undefined : value;
}

export function getStatusColor(statusId: number): string {
  return statusMap[statusId].color || 'gray';
}
