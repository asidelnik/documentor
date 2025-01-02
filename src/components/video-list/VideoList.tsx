import c from './VideoList.module.scss';
import ReactPlayer from 'react-player';
import { IVideo } from '../../types/IVideo';
import VideoInfo from '../video-info/VideoInfo';
import { IVideoListProps } from '../../props/IVideoListProps';
import { VideoInfoEnum } from '../../enums/VideoInfoEnum';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function VideoList({ videos }: IVideoListProps) {
  return (
    <>
      <div className={c.container}>
        <div className={c.header}>
          <h3>Videos timeline</h3>
          <NavLink
            to="/videos"
            className={c.addVideos}
          >
            <AddIcon />
            Add
          </NavLink>
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