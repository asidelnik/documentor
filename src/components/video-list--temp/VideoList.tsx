// TODO - decide if single video controls are enabled while sync playing.
import { useState, useRef } from "react"; // , useEffect
import { Video } from "../../types/video";
// import VideoItem from "../video-item/VideoItem";
import ReactPlayer from 'react-player'
import c from "./VideoList.module.scss"


type Props = {
  videos: Video[];
};

export default function VideoList({ videos }: Props) {
  const [isSyncPlay, setIsSyncPlaying] = useState(false);
  const timelineIntervalId = useRef(0);
  const [timelineTime, setTimelineTime] = useState(0);
  const timelineStartTime = videos[0].startTime;
  console.log({ timelineTime })

  function setSyncPlayingAndTimeline() {
    if (!isSyncPlay) {
      setIsSyncPlaying(!isSyncPlay);
      timelineIntervalId.current = setInterval(() => {
        setTimelineTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timelineIntervalId.current);
      setIsSyncPlaying(!isSyncPlay);
    }
  }

  function isSyncPlayHandle(video: Video): boolean | undefined {
    if (isSyncPlay) {
      const isTimelineTimeInVideoPeriod = timelineTime * 1000 >= video.startTime.getTime() - timelineStartTime.getTime();
      // console.log({ timelineTime, video });
      // console.log(video.startTime.getTime() - timelineStartTime.getTime());
      if (isTimelineTimeInVideoPeriod) {
        return true;
      }
    }
    return false;
  }

  return (
    <div>
      <button onClick={setSyncPlayingAndTimeline}>{isSyncPlay ? "Pause" : "Play All"}</button>
      <div className={c.videoTimeline}>
        {videos.map((video: Video) => (
          <ReactPlayer
            key={video.id}
            url={video.url}
            playing={isSyncPlayHandle(video)}
            className={c.videoItem}
            controls={true}
            config={{
              youtube: {
                embedOptions: {
                  width: video.orientation == "Landscape" ? "560" : "315",
                  height: video.orientation == "Landscape" ? "315" : "560"
                  // start: video.startTime.getTime() / 1000
                }
              }
            }}
            onPause={setSyncPlayingAndTimeline}
          />
        ))}
      </div>
    </div>
  );
}

{/* <iframe
  // ref={(ref) => (iframeRefs.current[index] = ref)}
  width="560"
  height="315"
  src={video.url}
  title="YouTube video player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe> */}

// const getNextVideoIndex = (currentIndex: number, videos: Video[]) => {
//   const currentVideo = videos[currentIndex];
//   const nextVideo = videos[currentIndex + 1];

//   if (nextVideo && nextVideo.startTime.getTime() === currentVideo.startTime.getTime() + counter + 1) {
//     return currentIndex + 1;
//   } else {
//     return currentIndex;
//   }
// };

// const [counter, setCounter] = useState(0);
// const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

// const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);


{/* <VideoItem
              video={video}
              // ref={(ref) => (iframeRefs.current[index] = ref)}
              isSyncPlay={isSyncPlay}
              timelineTime={timelineTime}
              timelineStartTime={timelineStartTime}
            /> */}