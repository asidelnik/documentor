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
