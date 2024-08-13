import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { getStatusStyles, statusAutocompleteOptions, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IVideoStatusMutationProps, mutateVideoStatus } from "../../query/mutateVideoStatus";
import { IVideoEventMutationProps, mutateVideoEvent } from "../../query/mutateVideoEvent";
import { IVideo } from "../../types/IVideo";
import { useFilters } from "../../contexts/filters-context";
import { videoOnMutate } from "../../query/videoStatusMutation";
import { VideoMutaion } from "../../enums/VideoMutation";

export default function VideoInfo({ video, eventsData }: IVideoInfoProps) {
  const filters = useFilters();
  const queryClient = useQueryClient()
  const dateString = video.startTimeDate ? dateToStringShortMonthDateYear(video.startTimeDate) : '';
  const optimisticStatusStyles = getStatusStyles(video.status);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${video.startLocation.coordinates}`;

  const { status: statusStatus, mutate: setVideoStatus } = useMutation({
    mutationFn: mutateVideoStatus,
    // When mutate is called:
    onMutate: (statusMutation: IVideoStatusMutationProps) =>
      videoOnMutate(statusMutation, queryClient, filters, VideoMutaion.Status),
    // If the mutation fails, use the context we returned above
    onError: (err, _statusMutation, context) => {
      if (context) {
        queryClient.setQueryData(['videos', filters], (optimisticVideos: IVideo[]) => {
          return (optimisticVideos || []).map((vid: IVideo) =>
            vid.id === video.id ? context.previousVideo : vid);
        });
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
    },
  });

  const { status: eventStatus, mutate: setVideoEvent } = useMutation({
    mutationFn: mutateVideoEvent,
    onMutate: (eventMutation: IVideoEventMutationProps) =>
      videoOnMutate(eventMutation, queryClient, filters, VideoMutaion.Event),
    // If the mutation fails, use the context we returned above
    onError: (err, _eventMutation, context) => {
      if (context) {
        queryClient.setQueryData(['videos', filters], (optimisticVideos: IVideo[]) => {
          return (optimisticVideos || []).map((vid: IVideo) =>
            vid.id === video.id ? context.previousVideo : vid);
        });
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
    },
  });

  const statusUpdateHandler = (option: number) =>
    setVideoStatus({ videoId: video.id, status: option });
  const eventUpdateHandler = (newEventId: string | null) =>
    setVideoEvent({ videoId: video.id, newEventId: newEventId, oldEventId: video.eventId });

  return (
    <>
      <div className={c.videoInfoContainer}>
        <div className={c.row1}>
          <p className={c.date} title={video.startTime}>{dateString}</p>
          <div className={c.icons}>
            <IconButton
              aria-label="show map"
              onClick={() => window.open(mapUrl, '_blank')}
            >
              <MapIcon />
            </IconButton>

            <PositionedMenu
              options={statusAutocompleteOptions}
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
          </div>
        </div>

        <div className={c.row2}>
          {/* {eventsData.isFetching || eventsData.isPending || eventsData.error ? '' : */}
          <CheckboxesTags
            options={eventsData.events}
            checkedId={video.eventId}
            update={eventUpdateHandler}
            isDisabled={eventsData.events.length <= 0 || eventStatus === 'pending'}
            placeholder='Event'
          />
          {/* } */}
        </div>
      </div>
    </>
  )
}
