// TODO - decide if single video controls are enabled while sync playing.
import c from "./VideosTimeline.module.scss"
import { useState, useRef, useEffect, createRef } from "react"; // , useEffect
import { IVideo } from "../../types/IVideo";
import ReactPlayer from 'react-player'
import { Link } from "react-router-dom";
import { OrientationEnum } from "../../enums/orientation-enum";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { dateToString, secondsToTimeString } from "../../utils/functions";
import { IVideosTimelineProps } from "./IVideosTimelineProps";

export default function VideosTimeline({ event }: IVideosTimelineProps) {
  const { videos } = event;
  const [isSyncPlay, setIsSyncPlay] = useState(false);
  const timelineIntervalId = useRef(0);
  const [timelineTime, setTimelineTime] = useState(0);
  // TODO - find a better solution than new Date()
  const timelineStartTime = videos[0].startTimeDate || new Date();
  const lastVideoIndex = videos.length - 1;
  const [volume, setVolume] = useState(0.5);
  const playersRef = useRef([createRef<ReactPlayer>()]);
  const eventDuration = secondsToTimeString(event.duration);
  const eventStartTime = dateToString(event.startTimeDate);

  useEffect(() => {
    if (isSyncPlay) {
      timelineIntervalId.current = setInterval(() => {
        setTimelineTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timelineIntervalId.current);
  }, [isSyncPlay]);


  function setSyncPlayingAndTimeline() {
    if (!isSyncPlay) {
      setIsSyncPlay(!isSyncPlay);
    } else {
      clearInterval(timelineIntervalId.current);
      setIsSyncPlay(!isSyncPlay);
    }
  }

  function handlePause() {
    setIsSyncPlay(false);
    clearInterval(timelineIntervalId.current);
  }

  function restartTimeline() {
    // console.log("restartTimeline");
    setIsSyncPlay(true);
    setTimelineTime(0);
    playersRef.current.map((player) => {
      const internalPlayer = player.current?.getInternalPlayer();
      if (internalPlayer) {
        internalPlayer.seekTo(0);
      }
    });
  }

  function isSyncPlayHandle(startTime: Date): boolean | undefined {
    if (isSyncPlay) {
      // console.log("timelineTime:", timelineTime * 1000);
      // console.log(startTime.getTime() - timelineStartTime.getTime());
      const isTimelineTimeInVideoPeriod = timelineTime * 1000 >= startTime.getTime() - timelineStartTime.getTime();
      if (isTimelineTimeInVideoPeriod) {
        return true;
      }
    }
    return false;
  }

  function handleTimelineEnd() {
    if (timelineTime !== 0) {
      setIsSyncPlay(false)
      setTimelineTime(0);
      clearInterval(timelineIntervalId.current);
    }
  }

  function volumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(parseFloat(e.target.value));
  }

  return (
    <div>
      <div className={c.eventInfoBar}>
        <Link to="/events" className={c.backButton}>
          <ArrowBackIcon />
        </Link>
        <p className={c.title}>{event.title}</p>
        {event.locationName && <p className={c.locationName}>{event.locationName}</p>}
        <p>
          {eventStartTime}
        </p>
        <p>{eventDuration}</p>
        <div className={c.tags}>{event.tags.map((tag: string, index: number) => (<p key={index} className={c.tag}>{tag}</p>))}</div>
      </div>
      <div className={c.videoTimeline}>
        {videos.map((video: IVideo, index: number) => (
          <ReactPlayer
            key={video.id}
            ref={playersRef.current[index]}
            url={video.url}
            // TODO - find a better solution than new Date()
            playing={isSyncPlayHandle(video.startTimeDate || new Date())}
            className={c.videoItem}
            controls={true}
            config={{
              youtube: {
                embedOptions: {
                  width: video.orientation === OrientationEnum.Landscape ? "560" : "315",
                  height: video.orientation === OrientationEnum.Landscape ? "315" : "560"
                  // start: video.startTime.getTime() / 1000
                }
              }
            }}
            onPause={handlePause}
            onEnded={() => index === lastVideoIndex && handleTimelineEnd()}
            volume={volume}
          />
        ))}
      </div>

      <div className={c.syncControls}>
        <button onClick={setSyncPlayingAndTimeline}>{isSyncPlay ? "Pause" : "Play All"}</button>
        {!isSyncPlay && timelineTime !== 0 && <button onClick={restartTimeline}>Restart</button>}
        {/* TODO - check this code - is React specific */}
        <input type="range" id="volume" name="volume" min="0" max="1" step="0.1" onChange={volumeChange} />
        <label htmlFor="volume">Volume</label>
      </div>
    </div>
  );
}
