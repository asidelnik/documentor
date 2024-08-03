import { IVideo } from '../types/IVideo';

export interface IVideoInfoProps {
  video: IVideo;
  fetchData: () => void;
}
