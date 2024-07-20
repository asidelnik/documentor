import { OrientationEnum } from '../enums/orientation-enum';
import { VideoStatusEnum } from '../enums/video-status';
import { LocationType } from './location';

interface VideoBase {
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
  startLocation: LocationType;
  endLocation: LocationType;
}

export interface VideoFromServer extends VideoBase {
  startTime: string;
  endTime: string;
}

export interface Video extends VideoBase {
  startTime: Date;
  endTime: Date;
};