export type VideoFromServer = {
  id: number;
  title: string;
  url: string;
  author: string;
  startTime: string;
  duration: number;
  endTime: string;
  orientation: 'Landscape' | 'Portrait';
};

export type Video = {
  id: number;
  title: string;
  url: string;
  author: string;
  startTime: Date;
  duration: number;
  endTime: Date;
  orientation: 'Landscape' | 'Portrait';
};
