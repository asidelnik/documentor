import { Video } from "../../types/video";
import VideoItem from "../video-item/VideoItem";

type Props = {
  data: Video[] | undefined;
};

export default function VideoTimeline({ data }: Props) {
  return (
    <>
      <ul>
        {data?.map((video: Video) => <VideoItem key={video.id} video={video} />)}
      </ul>
    </>
  )
}