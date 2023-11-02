import { Video } from './video';

/**
 *
 */

type EventBase = {
  id: number;
  title: string; // convert to name by removing dashes and capitalizing
  description?: string;
  duration: number;
  locationName?: string;
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
