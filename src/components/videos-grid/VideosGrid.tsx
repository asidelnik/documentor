import c from "./VideosGrid.module.scss";
import ReactPlayer from 'react-player'
import { IVideosGridProps } from "../../props/IVideosGridProps";
import VideoInfo from "../video-info/VideoInfo";

export default function VideosGrid({ videos, videosCount }: IVideosGridProps) {
  return (
    <>
      <div className={c.videoCount}>{videosCount} videos</div>
      <div className={c.videoGridContainer}>
        <div className={c.videoGrid}>
          {/* TODO - Virtual scrolling */}
          {videos.map((video) => (
            <div key={video.id} className={c.videoItem}>
              <ReactPlayer
                key={video.id}
                url={video.url}
                className={c.videoItem}
                controls={true}
                config={{
                  youtube: {
                    embedOptions: {
                      width: "315",
                      height: "177"
                    }
                  }
                }}
              />
              <VideoInfo />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}