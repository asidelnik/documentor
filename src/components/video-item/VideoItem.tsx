// import { Video } from "../../types/video"
// import { useEffect, useRef } from "react";
// import YTPlayer from "yt-player";

// type Props = {
//   video: Video;
//   isSyncPlay: boolean;
//   timelineTime: number;
//   timelineStartTime: Date;
// };

export default function VideoItem(/*{
  video,
  isSyncPlay,
  timelineTime,
  timelineStartTime
}: Props*/) {
  // const { orientation, url } = video;
  // const iframeRef = useRef<HTMLIFrameElement>(null);

  // useEffect(() => {
  //   if (iframeRef.current) {
  //     const player = new YTPlayer(iframeRef.current);
  //   }

  //   if (isSyncPlay) {
  //     const isVideoStartTimeEqualToTimeLineTime = timelineTime * 1000 == video.startTime.getTime() - timelineStartTime.getTime()
  //     if (isVideoStartTimeEqualToTimeLineTime) {
  //       player.play();
  //     }
  //   } else {
  //     if (player.getState() == "playing") {
  //       player.pause();
  //     }
  //   }
  // }, [isSyncPlay, timelineTime]); // , timelineStartTime,

  return (
    <>
      {/* <iframe
        ref={iframeRef}
        width={orientation == "Landscape" ? "560" : "315"}
        height={orientation == "Landscape" ? "315" : "560"}
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe> */}
    </>
  )
}