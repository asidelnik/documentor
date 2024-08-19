import c from './VideoList.module.scss';
import ReactPlayer from 'react-player';
import { IVideo } from '../../types/IVideo';
import VideoInfo from '../video-info/VideoInfo';
import { IVideoListProps } from '../../props/IVideoListProps';
import { VideoInfoEnum } from '../../enums/VideoInfoEnum';

export default function VideoList({ videos }: IVideoListProps) {
  if (!videos) return null;

  return (
    <>
      <div className={c.container}>
        <h3>Videos list</h3>
        <div className={c.videosContainer}>
          {videos.map((video: IVideo) => (
            <div key={video.id} className={c.video}>
              <ReactPlayer
                url={video.url}
                controls={true}
                width="315px"
                height="177px"
                style={{ position: 'relative' }}
                light={<img src={video.thumbnail} alt={`Video ${video.id} Thumbnail`} width="100%" height="100%" />}
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
      </div>
    </>
  );
}