import { IVideo } from '../types/IVideo';
import { IEventsAutoComplete } from './IEventsAutoComplete';

export interface IVideoInfoProps {
  video: IVideo;
  eventsData?: IEventsAutoComplete;
}
