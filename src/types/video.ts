export type Video = {
  id: number;
  title: string;
  url: string;
  author: string;
  startTime: string;
  duration: number;
  endTime: string;
  orientation: 'Landscape' | 'Portrait';
};