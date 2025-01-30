import { IVideo } from "../types/IVideo";


export interface IVideoListProps {
  videos: IVideo[] | undefined;
  eventId: string | undefined;
  eventTitle: string | undefined;
}
