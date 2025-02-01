import c from "./VideosGrid.module.scss";
import ReactPlayer from 'react-player'
import { IVideosGridProps, VideosGridParams } from "../../props/IVideosGridProps";
import VideoInfo from "../video-info/VideoInfo";
import { IVideo } from "../../types/IVideo";
import { VideoInfoEnum } from "../../enums/VideoInfoEnum";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GridHeader from "../grid-header/GridHeader";
import { mutateVideosEvent, IMutateVideosEventProps } from "../../query/videos/mutateVideosEvent";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../query/queryClient";
import { useFilters } from "../../contexts/filters-context";
import { videosOnMutate } from "../../query/videos/videosOnMutate";
import { SnackBarStatusEnum } from "../../enums/SnackBarStatusEnum";
import { ICustomSnackBar } from "../../types/ICustomSnackBar";
import CustomSnackBar from "../../shared/components/snackbar/CustomSnackBar";


export default function VideosGrid({ videos, videosCount, videosCountIsFetching, eventsData }: IVideosGridProps) {
  const { eventTitle, eventId } = useParams<VideosGridParams>();
  const [selectedVideos, setSelectedVideos] = useState<Array<string>>([]);
  const filters = useFilters();
  const [snackBar, setSnackBar] = useState<ICustomSnackBar>({ isShow: false, status: SnackBarStatusEnum.Failure, message: '' });

  useEffect(() => {
    unselectAllVideos();
  }, [filters.fromDate, filters.toDate, filters.statuses, filters.eventId]);

  const handleMouseDown = (videoId: string) => {
    if (!eventId) return;
    setSelectedVideos(prevSelectedVideos => {
      if (prevSelectedVideos.includes(videoId)) {
        return prevSelectedVideos.filter(id => id !== videoId);
      } else {
        return [...prevSelectedVideos, videoId];
      }
    });
  };

  const addSelectedVideosToEvent = async () => {
    if (!eventId) return;
    setVideosEvent({ eventId, videoIds: selectedVideos });
  }

  const { mutate: setVideosEvent } = useMutation({
    mutationFn: mutateVideosEvent,
    onMutate: (eventMutation: IMutateVideosEventProps) =>
      videosOnMutate(eventMutation, queryClient, filters),
    // If the mutation fails, use the context we returned above
    onError: (_err, _eventMutation, context) => {
      if (context) {
        queryClient.setQueryData(
          ['videos', filters],
          (optimisticVideos: Array<IVideo>) => {
            return (optimisticVideos || []).map(
              (vid: IVideo) => context.previousVideos.find((v) => v._id === vid._id) || vid
            );
          }
        );
      }
    },
    onSuccess: () => {
      setSelectedVideos([]);
      setSnackBar({
        isShow: true,
        status: SnackBarStatusEnum.Success,
        message: `Video${selectedVideos.length > 1 ? 's' : ''} added to event: ${eventTitle}`
      });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['videos-count'] });
    },
  });

  const unselectAllVideos = () => setSelectedVideos([])
  const closeSnackBar = () => setSnackBar({ ...snackBar, isShow: false });

  return (
    <>
      <GridHeader
        videosCount={videosCount}
        videosCountIsFetching={videosCountIsFetching}
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

      <CustomSnackBar snackBar={snackBar} closeSnackBar={closeSnackBar} />
    </>
  )
}