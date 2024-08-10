import { EventStatusEnum } from '../enums/event-status-enum';
import { LocationType } from './location';
import { IVideo } from './IVideo';

// Todo - decide if to move all proeprties into 1 event interface
export interface EventBase {
  id: string;
  title: string; // convert to name by removing dashes and capitalizing
  description: string;
  duration: number;
  locationName: string;
  startLocation: LocationType;
  tags: string[];
  status: EventStatusEnum;
  videos: IVideo[];
  videosUnprocessedCount: number;
  videosCount: number;
  isDisabled: boolean;
}

export interface EventType extends EventBase {
  startTime: Date;
  endTime: Date;
  startTimeFormatted: string;
  durationFormatted: string;
  statusFormatted: string;
}

export interface GetEventsResponse {
  events: EventType[];
  eventsCount: number;
}