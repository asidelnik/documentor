import { useState, useEffect, useRef } from "react";
import { Video } from "../../types/video";
import YTPlayer from "yt-player";

type Props = {
  videos: Video[];
};

export default function VideoList({ videos }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineTime, setTimelineTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const iframeRefs = useRef([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimelineTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const currentVideo = videos[currentVideoIndex];
      const nextVideoIndex = getNextVideoIndex(currentVideoIndex, videos);
      const nextVideo = videos[nextVideoIndex];

      if (timelineTime >= currentVideo.startTime.getTime() + counter) {
        playVideo(currentVideoIndex);
        setCounter((prevCounter) => prevCounter + 1);

        if (nextVideo && nextVideo.startTime.getTime() === currentVideo.startTime.getTime() + counter + 1) {
          setCurrentVideoIndex(nextVideoIndex);
        } else {
          setIsPlaying(false);
        }
      }
    }
  }, [isPlaying, timelineTime, counter, currentVideoIndex]);

  const playAll = () => {
    setIsPlaying(true);
  };

  const playVideo = (index: number) => {
    const player = new YTPlayer(iframeRefs.current[index]);

    player.play();
  };

  const getNextVideoIndex = (currentIndex: number, videos: Video[]) => {
    const currentVideo = videos[currentIndex];
    const nextVideo = videos[currentIndex + 1];

    if (nextVideo && nextVideo.startTime.getTime() === currentVideo.startTime.getTime() + counter + 1) {
      return currentIndex + 1;
    } else {
      return currentIndex;
    }
  };

  return (
    <div>
      <button onClick={playAll}>Play All</button>
      <ul>
        {videos.map((video, index) => (
          <li key={video.id}>
            <iframe
              ref={(ref) => (iframeRefs.current[index] = ref)}
              width="560"
              height="315"
              src={video.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
}