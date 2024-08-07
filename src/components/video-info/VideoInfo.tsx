import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { getStatusStyles, statusAutocompleteOptions, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";
// import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IVideoStatusMutationProps, mutateVideoStatus } from "../../query/mutateVideoStatus";
// import { mutateVideoEvent } from "../../query/mutateVideoEvent";
import { IVideo } from "../../types/IVideo";
import { useFilters } from "../../contexts/filters-context";

export default function VideoInfo({ video/*, eventsData*/ }: IVideoInfoProps) {
  const filters = useFilters();
  const queryClient = useQueryClient()
  const dateString = video.startTimeDate ? dateToStringShortMonthDateYear(video.startTimeDate) : '';
  const optimisticStatusStyles = getStatusStyles(video.status);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${video.startLocation.coordinates}`;

  const { status, mutate: setVideoStatus } = useMutation({
    mutationFn: mutateVideoStatus,
    // When mutate is called:
    onMutate: async (statusMutation: IVideoStatusMutationProps) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['videos', video.id] });

      // Snapshot the previous value
      const videosData = queryClient.getQueryData<IVideo[]>(['videos', filters]);
      const previousVideo = videosData?.find(v => v.id === video.id);
      if (!previousVideo) return null;
      const updatedVideo = { ...previousVideo, status: statusMutation.status };
      console.log(updatedVideo)

      // Optimistically update to the new value
      queryClient.setQueryData(['videos', filters], (previousVideos: IVideo[]) => {
        return (previousVideos || []).map((vid: IVideo) =>
          vid.id === video.id ? updatedVideo : vid);
      });

      // Return a context with the previous and new video
      // console.log({ previousVideo, updatedVideo })
      return { previousVideo, updatedVideo }
    },
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
  //// Maybe move into the CheckboxTags (pass the video.id & urlPath)
  // const { status: videoEventStatus, mutate: setVideoEvent } = useMutation({ mutationFn: mutateVideoEvent });

  const statusUpdateHandler = (option: number) => setVideoStatus({ videoId: video.id, status: option });
  // const eventUpdateHandler = (newEventId: string | null) => setVideoEvent({ videoId: video.id, newEventId: newEventId, oldEventId: video.eventId });

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

            <PositionedMenu options={statusAutocompleteOptions} videoStatus={video.status}
              select={statusUpdateHandler} isDisabled={status === 'pending'}>
              {/* isFetchingVideos > 0}> */}
              {/* {videoStatusStatus === 'pending' ? <CircularProgress size={20} /> : ( */}
              <div className={c.status} title={statusLabels[video.status]}
                style={{
                  backgroundColor: optimisticStatusStyles.bg,
                  boxShadow: optimisticStatusStyles.boxShadow,
                  opacity: status === 'pending' ? 0.5 : 1 //isFetchingVideos > 0 ? 0.5 : 1
                }}></div>
              {/* )} */}
            </PositionedMenu>
          </div>
        </div>

        {/* <div className={c.row2}>
          {eventsData.isFetching || eventsData.isPending || eventsData.error ? '' :
            <CheckboxesTags options={eventsData.events} checkedId={video.eventId}
              update={eventUpdateHandler} />
          }
        </div> */}
      </div>
    </>
  )
}
