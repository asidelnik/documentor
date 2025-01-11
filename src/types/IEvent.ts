import { EventType } from './EventType';
import { ILocation, ILocationTexts } from './ILocation';
import { IVideo } from './IVideo';

// Todo - decide if to move all proeprties into 1 event interface
export interface IEvent {
  _id: string;
  title: string; // convert to name by removing dashes and capitalizing
  description: string;
  types: Array<EventType>;
  duration: number;
  location: ILocation;
  locationTexts: ILocationTexts;
  videos: Array<IVideo>;
  status: number;
  priority: number;
  fatalities: number;
  injuries: number;
  severity: number;
  startTime: string;
  endTime: string;
  tags: string[];
  videosUnprocessedCount: number;
  videosCount: number;
  // locationName: string;
}

export interface IEventAndCalcs extends IEvent {
  startTimeDate: Date;
  endTimeDate: Date;
  startTimeFormatted: string;
  durationFormatted: string;
  priorityFormatted: string;
}

export interface IEventsAndCount {
  events: IEvent[];
  eventsCount: number;
}

export interface IEventAddForm {
  title: string;
  priority: number;
  startTime: Date;
  description?: string;
  status: number;
}

export interface IEventEditForm {
  title: string;
  priority: number;
  startTime: Date | null;
  description?: string;
  status: number;
}

export interface IEventAndDates extends IEvent {
  startTimeDate: Date | null;
  endTimeDate: Date;
}
