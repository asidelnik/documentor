import { IVideo } from '../types/IVideo';
import { IEventsAutoComplete } from './IEventsAutoComplete';

export interface IVideosGridProps {
  videos: IVideo[];
  videosCount: number;
  videosCountIsFetching: boolean;
  eventsData: IEventsAutoComplete;
}

export type VideosGridParams = {
  eventTitle: string | undefined;
  eventId: string | undefined;
};

export interface IGridHeaderProps {
  videosCount: number;
  videosCountIsFetching: boolean;
  eventId: string | undefined;
  eventTitle: string | undefined;
  selectedVideos: Array<string>;
  unselectAllVideos: () => void;
  addSelectedVideosToEvent: () => void;
}