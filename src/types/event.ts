import { Video } from './video';

type EventBase = {
  id: string;
  title: string;
  description: string;
  duration: number;
  startLocation: Location;
  endLocation: Location;
  tags: string[];
};

export type Timeline_Event = EventBase & {
  relatedVideos: Video[];
  startTime: Date;
  endTime: Date;
};

export type Events_Event = EventBase & {
  startTime: string;
  endTime: string;
  // videos counts
};

// export type EventFromServer = EventWithVideos & {
//   startTime: string;
//   endTime: string;
// };
