import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { CircularProgress, IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { getStatusStyles, statusAutocompleteOptions, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";
import { useEffect } from "react";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { useMutation } from "@tanstack/react-query";
import { mutateVideoStatus } from "../../query/mutateVideoStatus";
import { mutateVideoEvent } from "../../query/mutateVideoEvent";

export default function VideoInfo({ video, eventsData, fetchData }: IVideoInfoProps) {
  const dateString = video.startTimeDate ? dateToStringShortMonthDateYear(video.startTimeDate) : '';
  const statusStyles = getStatusStyles(video.status)
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${video.startLocation.coordinates}`;

  const { status: videoStatus, mutate: setVideoStatus } = useMutation({ mutationFn: mutateVideoStatus });
  // Maybe move into the CheckboxTags (pass the video.id & urlPath)
  const { status: eventStatus, mutate: setVideoEvent } = useMutation({ mutationFn: mutateVideoEvent });

  useEffect(() => {
    if (videoStatus === 'success' || eventStatus === 'success') {
      fetchData();
    }
  }, [videoStatus, eventStatus])

  const eventUpdateHandler = (newEventId: string | null) => setVideoEvent({ videoId: video.id, newEventId: newEventId, oldEventId: video.eventId });

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
              select={(option: number) => setVideoStatus({ videoId: video.id, status: option })}>
              {videoStatus === 'pending' ? <CircularProgress size={20} /> : (
                <div className={c.status} title={statusLabels[video.status]}
                  style={{ backgroundColor: statusStyles.bg, boxShadow: statusStyles.boxShadow }}></div>
              )}
            </PositionedMenu>
          </div>
        </div>

        <div className={c.row2}>
          {eventsData.isFetching || eventsData.isPending || eventsData.error ? '' :
            <CheckboxesTags options={eventsData.events} checkedId={video.eventId}
              update={eventUpdateHandler} />
          }
        </div>
      </div>
    </>
  )
}
