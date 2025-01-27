import c from "./VideosGrid.module.scss";
import ReactPlayer from 'react-player'
import { IVideosGridProps, VideosGridParams } from "../../props/IVideosGridProps";
import VideoInfo from "../video-info/VideoInfo";
import { IVideo } from "../../types/IVideo";
import { VideoInfoEnum } from "../../enums/VideoInfoEnum";
import { useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloseIcon from '@mui/icons-material/Close';


export default function VideosGrid({ videos, videosCount, eventsData }: IVideosGridProps) {
  const { eventTitle, eventId } = useParams<VideosGridParams>();
  const [selectedVideos, setSelectedVideos] = useState<Array<string>>([]);
  const [isSelecting, setIsSelecting] = useState(false);

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
    setIsSelecting(true);
    handleVideoClick(videoId);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const handleMouseEnter = (videoId: string) => {
    if (isSelecting) {
      handleVideoClick(videoId);
    }
  };

  const addVideosHandler = () => {
    // TODO - server path, post request function, server endpoint
    console.log('Add videos to event', eventId, selectedVideos);
  }

  const unselectAllVideosHandler = () => {
    setSelectedVideos([]);
  }

  return (
    <>
      <div className={c.gridHeader}>
        <div className={c.headerTitles}>
          <div>{videosCount} videos </div>
          {eventId && <h3>{eventTitle || ''}</h3>}
        </div>

        {eventId && (
          <div className={c.headerActions}>
            <div>{`${selectedVideos.length} selected`}</div>
            <IconButton
              aria-label="Unselect all videos button"
              disabled={selectedVideos.length === 0}
              onClick={unselectAllVideosHandler}
              color="info"
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Tooltip
              title="Add videos to event"
              placement="top-end">
              <IconButton
                aria-label="Add videos to event button"
                disabled={selectedVideos.length === 0}
                onClick={addVideosHandler}
                color="primary"
              >
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>

      {videos && videos.length > 0 && (
        <div className={c.container} onMouseUp={handleMouseUp}>
          <div className={c.videosGrid}>
            {/* TODO - Infinite scrolling */}
            {videos.map((video: IVideo) => (
              <div
                key={video._id}
                className={`${c.video} ${selectedVideos.includes(video._id) ? c.selected : ''}`}
                onMouseDown={() => handleMouseDown(video._id)}
                onMouseEnter={() => handleMouseEnter(video._id)}
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
                  videoInfoType={eventId ? VideoInfoEnum.EventVideoList : VideoInfoEnum.VideosGrid}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}