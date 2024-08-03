import { OrientationEnum } from '../enums/orientation-enum';
import { VideoStatusEnum } from '../constants/video-status';
import { LocationType } from './location';

export interface IVideo {
  id: number;
  title?: string;
  url: string;
  thumbnail: string;
  // author: string;
  description?: string;
  duration: number;
  orientation: OrientationEnum;
  eventId?: number;
  status: VideoStatusEnum;
  tags?: string[];
  startLocation: LocationType;
  endLocation: LocationType;
  startTime: string;
  endTime: string;
  startTimeDate?: Date;
  endTimeDate?: Date;
}