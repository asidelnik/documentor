import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { eventStatusNumOptions, getStatusStyles, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";
import ComboBox from "../../shared/components/combo-box/ComboBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IVideoStatusMutationProps, mutateVideoStatus } from "../../query/videos/mutateVideoStatus";
import { IVideoEventMutationProps, mutateVideoEvent } from "../../query/videos/mutateVideoEvent";
import { IVideo } from "../../types/IVideo";
import { videoOnMutate } from "../../query/videos/videoOnMutate";
import { VideoMutation } from "../../enums/VideoMutation";
import { VideoInfoEnum } from "../../enums/VideoInfoEnum";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useVideosFilters } from "../../contexts/videos/useVideosFilters";

export default function VideoInfo({ video, eventsData, videoInfoType, isSelected, onMouseDown }: IVideoInfoProps) {
  const filters = useVideosFilters();
  const queryClient = useQueryClient();
  const dateString = video.startTimeDate ? dateToStringShortMonthDateYear(video.startTimeDate) : '';
  const optimisticStatusStyles = getStatusStyles(video.status);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${video.startLocation.coordinates}`;

  const { status: statusStatus, mutate: setVideoStatus } = useMutation({
    mutationFn: mutateVideoStatus,
    // When mutate is called:
    onMutate: (statusMutation: IVideoStatusMutationProps) =>
      videoOnMutate(statusMutation, queryClient, filters, VideoMutation.Status),
    // If the mutation fails, use the context we returned above
    onError: (_err, _statusMutation, context) => {
      if (context) {
        queryClient.setQueryData(['videos', filters], (optimisticVideos: IVideo[]) => {
          return (optimisticVideos || []).map((vid: IVideo) =>
            vid._id === video._id ? context.previousVideo : vid);
        });
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['videos-count'] });
    },
  });

  const { status: eventStatus, mutate: setVideoEvent } = useMutation({
    mutationFn: mutateVideoEvent,
    onMutate: (eventMutation: IVideoEventMutationProps) =>
      videoOnMutate(eventMutation, queryClient, filters, VideoMutation.Event),
    // If the mutation fails, use the context we returned above
    onError: (_err, _eventMutation, context) => {
      if (context) {
        queryClient.setQueryData(['videos', filters], (optimisticVideos: IVideo[]) => {
          return (optimisticVideos || []).map((vid: IVideo) =>
            vid._id === video._id ? context.previousVideo : vid);
        });
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['videos-count'] });
    },
  });

  const statusUpdateHandler = (option: number) =>
    setVideoStatus({ videoId: video._id, status: option });
  const eventUpdateHandler = (newEventId: string | null) =>
    setVideoEvent({ videoId: video._id, newEventId: newEventId, oldEventId: video.eventId });

  return (
    <>
      <div className={c.videoInfoContainer} onMouseDown={onMouseDown}>
        <div className={c.row1}>
          <p className={c.date} title={video.startTime}>{dateString}</p>
          <div className={c.icons}>
            <IconButton
              aria-label="show map"
              onClick={() => window.open(mapUrl, '_blank')}
            >
              <MapIcon />
            </IconButton>

            {videoInfoType === VideoInfoEnum.VideosGrid &&
              <PositionedMenu
                options={eventStatusNumOptions}
                videoStatus={video.status}
                isDisabled={statusStatus === 'pending'}
                select={statusUpdateHandler}>
                {/* {videoStatusStatus === 'pending' ? <CircularProgress size={20} /> : ( */}
                <div className={c.status} title={statusLabels[video.status]}
                  style={{
                    backgroundColor: optimisticStatusStyles.bg,
                    boxShadow: optimisticStatusStyles.boxShadow,
                    opacity: statusStatus === 'pending' ? 0.5 : 1 //isFetchingVideos > 0 ? 0.5 : 1
                  }}></div>
              </PositionedMenu>
            }
            {videoInfoType === VideoInfoEnum.VideosGrid_AddVideosToEvent ?
              (isSelected ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />)
              : null
            }
          </div>
        </div>

        {(videoInfoType === VideoInfoEnum.VideosGrid || videoInfoType === VideoInfoEnum.VideosGrid_AddVideosToEvent) && eventsData &&
          <div className={c.row2}>
            <ComboBox
              options={eventsData.events}
              checkedId={video.eventId}
              update={eventUpdateHandler}
              isDisabled={eventsData.events.length <= 0 || eventStatus === 'pending' || videoInfoType === VideoInfoEnum.VideosGrid_AddVideosToEvent}
              placeholder='Event'
              width={'100%'}
              size='small'
            />
          </div>
        }
      </div>
    </>
  )
}
