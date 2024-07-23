import c from "./VideosGrid.module.scss";
import ReactPlayer from 'react-player'
import { IVideosGridProps } from "../../props/IVideosGridProps";
import VideoInfo from "../video-info/VideoInfo";
import { Video } from "../../types/video";

export default function VideosGrid({ videos, videosCount, fetchData }: IVideosGridProps) {
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
                <VideoInfo video={video} fetchData={() => fetchData()} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}