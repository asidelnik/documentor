import c from './VideoList.module.scss';
import ReactPlayer from 'react-player';
import { IVideo } from '../../types/IVideo';
import VideoInfo from '../video-info/VideoInfo';
import { IVideoListProps } from '../../props/IVideoListProps';
import { VideoInfoEnum } from '../../enums/VideoInfoEnum';
import { useNavigate } from 'react-router-dom';
import { useFiltersDispatch } from '../../contexts/filters-context';
import { Button } from '@mui/material';

export default function VideoList({ videos, eventId, eventTitle }: IVideoListProps) {
  const videosDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  function updateEventVideos() {
    if (eventId) {
      videosDispatch({ type: 'update-event-id', payload: eventId });
      navigate(`/videos/update-event-videos`);
    }
  }

  function addEventVideos() {
    if (eventId) {
      videosDispatch({ type: 'update-event-id', payload: undefined });
      navigate(`/videos/add-videos-to-event/${eventTitle}/${eventId}`);
    }
  }

  return (
    <>
      <div className={c.container}>
        <div className={c.header}>
          <h3>Videos timeline</h3>
          <div className={c.buttons}>
            <Button variant="outlined" onClick={addEventVideos} color="info" className={c.button}>
              Add
            </Button>
            <Button variant="outlined" onClick={updateEventVideos} className={c.button}>
              Update
            </Button>
          </div>
        </div>

        {videos && videos.length > 0 && (
          <div className={c.videosContainer}>
            {videos.map((video: IVideo) => (
              <div key={video._id} className={c.video}>
                <ReactPlayer
                  url={video.url}
                  controls={true}
                  width="315px"
                  height="177px"
                  style={{ position: 'relative' }}
                  config={{
                    youtube: {
                      embedOptions: {
                        width: '315',
                        height: '177', // video.orientation === OrientationEnum.Landscape ? "177" : "560"
                      },
                    },
                  }}
                />
                <VideoInfo video={video} videoInfoType={VideoInfoEnum.EventVideoList} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}