import { IVideo } from '../types/IVideo';

export interface IVideosGridProps {
  videos: IVideo[];
  videosCount: number;
  fetchData: () => void;
}
