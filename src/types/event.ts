import { EventStatusEnum } from '../enums/event-status-enum';
import { LocationType } from './location';
import { Video } from './video';

type EventBase = {
  id: number;
  title: string; // convert to name by removing dashes and capitalizing
  description: string;
  duration: number;
  locationName: string;
  startLocation: LocationType;
  tags: string[];
  status: EventStatusEnum;
  videos: Video[];
  videosUnprocessedCount: number;
  videosCount: number;
};

export type EventType = EventBase & {
  startTime: Date;
  endTime: Date;
  startTimeFormatted: string;
  durationFormatted: string;
  statusFormatted: string;
};

export type GetEventsResponse = {
  events: EventType[];
  eventsCount: number;
};