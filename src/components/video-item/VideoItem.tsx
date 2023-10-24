import { Video } from "../../types/video"

type Props = {
  video: Video;
};

export default function VideoItem({ video }: Props) {
  const { orientation, url } = video;
  return (
    <>
      <iframe
        key={video.id}
        width={orientation == "Landscape" ? "560" : "315"}
        height={orientation == "Landscape" ? "315" : "560"}
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      // frameborder="0"
      // allowfullscreen
      ></iframe>
    </>
  )
}