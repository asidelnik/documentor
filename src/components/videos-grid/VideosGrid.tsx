import c from "./VideosGrid.module.scss";
import ReactPlayer from 'react-player'
import { IVideosGridProps } from "../../props/IVideosGridProps";
import VideoInfo from "../video-info/VideoInfo";
import { Video } from "../../types/video";
import { useEffect, useState } from "react";
import { serverRoutes } from "../../server/server-routes";
import { IEventIdTitle } from "../../types/IEventIdTitle";

export default function VideosGrid({ videos, videosCount, fetchData }: IVideosGridProps) {
  const [events, setEvents] = useState<IEventIdTitle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(null);
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const path = serverRoutes.events.getEventsAutocomplete();
        const response = await fetch(baseUrl + path);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setEvents(data);
        setIsError(false);
        setIsLoading(false);
      } catch (error) {
        // console.log(error);
        setErrorMessage('Error');
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <div className={c.videoCount}>{videosCount} videos</div>
      {videos && videos.length > 0 && (
        <div className={c.container}>
          <div className={c.videosGrid}>
            {/* TODO - Virtual scrolling */}
            {videos.map((video: Video) => (
              <div key={video.id} className={c.video} >
                <ReactPlayer
                  key={video.id}
                  url={video.url}
                  controls={true}
                  width='100%'
                  height='177px'
                  style={{ position: 'relative' }}
                  light={<img src={video.thumbnail} alt={`Video ${video.id} Thumbnail`} width="100%" height="100%" />}
                  config={{
                    youtube: {
                      embedOptions: {
                        width: "315",
                        height: "177" //video.orientation === OrientationEnum.Landscape ? "177" : "560"
                      }
                    }
                  }}
                />
                <VideoInfo video={video} fetchData={() => fetchData()} events={events} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}