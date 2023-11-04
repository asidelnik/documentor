import { OrientationEnum } from '../enums/orientation-enum';
import { VideoStatusEnum } from '../enums/video-status-enum';
/*

*/

type VideoBase = {
  id: number;
  title?: string;
  url: string;
  // author: string;
  description?: string;
  duration: number;
  orientation: OrientationEnum;
  eventId?: number;
  status: VideoStatusEnum;
  tags?: string[];
  startLocation: Location;
  endLocation: Location;
};

export type VideoFromServer = VideoBase & {
  startTime: string;
  endTime: string;
};

export type Video = VideoBase & {
  startTime: Date;
  endTime: Date;
};
