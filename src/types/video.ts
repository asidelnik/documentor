import { OrientationEnum } from '../enums/orientation-enum';
import { StatusEnum } from '../enums/status-enum';
/*

*/

type VideoBase = {
  id: number;
  title: string;
  url: string;
  author: string;
  description?: string;
  duration: number;
  orientation: OrientationEnum;
  status: StatusEnum;
};

export type VideoFromServer = VideoBase & {
  startTime: string;
  endTime: string;
};

export type Video = VideoBase & {
  startTime: Date;
  endTime: Date;
};
