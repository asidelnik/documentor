import { OrientationEnum } from '../enums/orientation-enum';
import { VideoStatusEnum } from '../constants/video-status';
import { LocationType } from './location';

interface VideoBase {
  id: string;
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
}