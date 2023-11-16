import { EventStatusEnum } from '../enums/event-status-enum';
import { Video } from './video';

type EventBase = {
  id: number;
  title: string; // convert to name by removing dashes and capitalizing
  description?: string;
  duration: number;
  locationName?: string;
  startLocation: Location;
  tags: string[];
  status: EventStatusEnum;
  videos: Video[];
  videosUnprocessedCount: number;
};

export type EventFromServer = EventBase & {
  startTime: string;
  endTime: string;
};

export type EventType = EventBase & {
  startTime: Date;
  endTime: Date;
};