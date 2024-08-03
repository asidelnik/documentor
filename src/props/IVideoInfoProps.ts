import { IEventIdTitle } from '../types/IEventIdTitle';
import { IVideo } from '../types/IVideo';

export interface IVideoInfoProps {
  video: IVideo;
  events: IEventIdTitle[];
  fetchData: () => void;
}
