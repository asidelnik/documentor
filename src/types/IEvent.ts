import { ILocation, ILocationTexts } from './ILocation';
import { IVideo } from './IVideo';

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  types: Array<string>;
  typesString: string;
  typesLabels?: Array<string>;
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
  tags: Array<string>;
  videosUnprocessedCount: number;
  videosCount: number;
}

export interface IEventAndCalcs extends IEvent {
  startTimeDate: Date;
  endTimeDate: Date;
  startTimeFormatted: string;
  durationFormatted: string;
  priorityFormatted: string;
}

export interface IEventsAndCount {
  events: Array<IEvent>;
  eventsCount: number;
}

export interface IEventAddForm {
  title: string;
  eventTypes?: Array<string>;
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
