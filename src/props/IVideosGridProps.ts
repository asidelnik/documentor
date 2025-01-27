import { IVideo } from '../types/IVideo';
import { IEventsAutoComplete } from './IEventsAutoComplete';

export interface IVideosGridProps {
  videos: IVideo[];
  videosCount: number;
  eventsData: IEventsAutoComplete;
}

export type VideosGridParams = {
  eventTitle: string | undefined;
  eventId: string | undefined;
};