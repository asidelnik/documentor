import { EventStatusEnum } from '../enums/event-status-enum';
import { LocationType } from './location';
import { IVideo } from './IVideo';

// Todo - decide if to move all proeprties into 1 event interface
export interface IEvent {
  id: string;
  priority: number;
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
  startTime: string;
  endTime: string;
}

export interface IEventAndCalcs extends IEvent {
  startTimeDate: Date;
  endTimeDate: Date;
  startTimeFormatted: string;
  durationFormatted: string;
  statusFormatted: string;
  priorityFormatted: string;
}

export interface IEventsAndCount {
  events: IEvent[];
  eventsCount: number;
}