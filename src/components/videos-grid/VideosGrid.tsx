import c from "./VideosGrid.module.scss";
import ReactPlayer from 'react-player'
import { IVideosGridProps } from "../../props/IVideosGridProps";
import VideoInfo from "../video-info/VideoInfo";
import { IVideo } from "../../types/IVideo";
import { VideoInfoEnum } from "../../enums/VideoInfoEnum";

export default function VideosGrid({ videos, videosCount, eventsData }: IVideosGridProps) {
  return (
    <>
      <div className={c.videoCount}>{videosCount} videos</div>
      {videos && videos.length > 0 && (
        <div className={c.container}>
          <div className={c.videosGrid}>
            {/* TODO - Infinite scrolling */}
            {videos.map((video: IVideo) => (
              <div key={video._id} className={c.video} >
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
                  videoInfoType={VideoInfoEnum.VideosGrid}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}