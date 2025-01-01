import { OrientationEnum } from '../enums/orientation-enum';
import { VideoStatusEnum } from '../constants/video-status';
import { IVideoLocation } from './IVideoLocation';

export interface IVideo {
  _id: string;
  title?: string;
  url: string;
  thumbnail: string;
  // author: string;
  description?: string;
  duration: number;
  orientation: OrientationEnum;
  eventId: string | null;
  status: VideoStatusEnum;
  tags?: string[];
  startLocation: IVideoLocation;
  endLocation: IVideoLocation;
  startTime: string;
  endTime: string;
  startTimeDate?: Date;
  endTimeDate?: Date;
}