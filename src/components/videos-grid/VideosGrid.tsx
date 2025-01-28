import c from "./VideosGrid.module.scss";
import ReactPlayer from 'react-player'
import { IVideosGridProps, VideosGridParams } from "../../props/IVideosGridProps";
import VideoInfo from "../video-info/VideoInfo";
import { IVideo } from "../../types/IVideo";
import { VideoInfoEnum } from "../../enums/VideoInfoEnum";
import { useParams } from "react-router-dom";
import { useState } from "react";
import GridHeader from "../grid-header/GridHeader";


export default function VideosGrid({ videos, videosCount, eventsData }: IVideosGridProps) {
  const { eventTitle, eventId } = useParams<VideosGridParams>();
  const [selectedVideos, setSelectedVideos] = useState<Array<string>>([]);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideos(prevSelectedVideos => {
      if (prevSelectedVideos.includes(videoId)) {
        return prevSelectedVideos.filter(id => id !== videoId);
      } else {
        return [...prevSelectedVideos, videoId];
      }
    });
  };

  const handleMouseDown = (videoId: string) => {
    if (!eventId) return;
    handleVideoClick(videoId);
  };

  const addSelectedVideosToEvent = () => {
    // TODO - server path, post request function, server endpoint
    console.log('Add videos to event', eventId, selectedVideos);
  }

  const unselectAllVideos = () => {
    setSelectedVideos([]);
  }

  return (
    <>
      <GridHeader
        videosCount={videosCount}
        eventId={eventId}
        eventTitle={eventTitle}
        selectedVideos={selectedVideos}
        unselectAllVideos={unselectAllVideos}
        addSelectedVideosToEvent={addSelectedVideosToEvent}
      />

      {videos && videos.length > 0 && (
        <div className={c.container}>
          <div className={c.videosGrid}>
            {/* TODO - Infinite or Virtual scrolling */}
            {videos.map((video: IVideo) => (
              <div
                key={video._id}
                className={`${c.video} ${selectedVideos.includes(video._id) ? c.selected : ''}`}
              >
                <ReactPlayer
                  key={video._id}
                  url={video.url}
                  controls={true}
                  width='100%'
                  height='177px'
                  style={{ position: 'relative' }}
                  light={<img src={video.thumbnail} alt={`Video ${video._id} Thumbnail`} width="100%" height="100%" />}
                  config={{
                    youtube: {
                      embedOptions: {
                        width: "315",
                        height: "177" //video.orientation === OrientationEnum.Landscape ? "177" : "560"
                      }
                    }
                  }}
                />

                <VideoInfo
                  video={video}
                  eventsData={eventsData}
                  videoInfoType={eventId ? VideoInfoEnum.VideosGrid_AddVideosToEvent : VideoInfoEnum.VideosGrid}
                  isSelected={selectedVideos.includes(video._id)}
                  onMouseDown={() => handleMouseDown(video._id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}