import { useState } from "react"; // , useEffect
import { Video } from "../../types/video";
// import VideoItem from "../video-item/VideoItem";
import ReactPlayer from 'react-player'
import c from "./VideoList.module.scss"


type Props = {
  videos: Video[];
};

export default function VideoList({ videos }: Props) {
  const [isSyncPlay, setIsSyncPlaying] = useState(false);
  console.log(videos)
  // const [timelineTime, setTimelineTime] = useState(0);
  // const timelineStartTime = videos[0].startTime;

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimelineTime((prevTime) => prevTime + 1);
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div>
      <button onClick={() => setIsSyncPlaying(!isSyncPlay)}>Play All</button>
      <div className={c.videoTimeline}>
        {videos.map((video) => (
          <div key={video.id}>
            <ReactPlayer
              url={video.url}
              config={{
                youtube: {
                  embedOptions: {
                    width: video.orientation == "Landscape" ? "560" : "315",
                    height: video.orientation == "Landscape" ? "315" : "560"
                    // showinfo: 1,
                    // controls: 1,
                    // autoplay: 1,
                    // start: video.startTime.getTime() / 1000
                  }
                }
              }}
            />

            {/* <VideoItem
              video={video}
              // ref={(ref) => (iframeRefs.current[index] = ref)}
              isSyncPlay={isSyncPlay}
              timelineTime={timelineTime}
              timelineStartTime={timelineStartTime}
            /> */}
          </div>
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