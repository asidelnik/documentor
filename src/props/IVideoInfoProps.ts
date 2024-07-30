import { IEventIdTitle } from '../types/IEventIdTitle';
import { Video } from '../types/video';

export interface IVideoInfoProps {
  video: Video;
  events: IEventIdTitle[];
  fetchData: () => void;
}
