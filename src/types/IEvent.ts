import { ILocation, ILocationTexts } from './ILocation';
import { IVideo } from './IVideo';

export interface IEventBase {
  _id: string;
  title: string;
  description: string;
  duration: number;
  location: ILocation;
  locationTexts: ILocationTexts;
  videos: Array<IVideo>;
  status: number;
  priority: number;
  startTime: string;
  endTime: string;
  // types: Array<string>;
  // fatalities: number;
  // injuries: number;
  // severity: number;
  // tags: Array<string>;
}

/** For events table - with GET /events endpoint */
export interface IEventForTable extends IEventBase {
  typesString: string;
  videosUnprocessedCount: number;
  videosCount: number;
}

/** For events table - with client calculations */
export interface IEventAndCalcsForTable extends IEventForTable {
  startTimeFormatted: string;
  durationFormatted: string;
  priorityFormatted: string;
}

/** For events table - events & count */
export interface IEventsAndCount {
  events: Array<IEventForTable>;
  eventsCount: number;
}

/** For event page & event editing */
export interface IEventAndDates extends IEventBase {
  typesLabels?: Array<string>;
  startTimeDate: Date | null;
  endTimeDate: Date;
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