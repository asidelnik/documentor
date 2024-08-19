import { IVideo } from '../types/IVideo';
import { IEventsAutoComplete } from './IEventsAutoComplete';
import { VideoInfoEnum } from '../enums/VideoInfoEnum';

export interface IVideoInfoProps {
  video: IVideo;
  eventsData?: IEventsAutoComplete;
  videoInfoType: VideoInfoEnum;
}