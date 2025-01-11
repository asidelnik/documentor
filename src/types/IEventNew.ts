import { EventType } from './EventType';
import { ILocation, ILocationTexts } from './ILocation';
import { IVideo } from './IVideo';

export interface IEventNew {
  _id: string;
  title: string;
  description: string;
  types: EventType[];
  duration: number;
  location: ILocation;
  locationTexts: ILocationTexts;
  videoIds: IVideo[];
  videosUnprocessedCount: number;
  videosCount: number;
  status: number;
  priority: number;
  severity: number;
  startTime: string;
  endTime: string;
  fatalities: number;
  injuries: number;
}
