import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { CircularProgress, IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { getStatusStyles, statusAutocompleteOptions, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";
import { useEffect } from "react";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { useUpdateVideoEvent } from "../../hooks/useUpdateVideoEvent";
import { useMutation } from "@tanstack/react-query";
import { serverRoutes } from "../../server/server-routes";

export default function VideoInfo({ video, eventsData, fetchData }: IVideoInfoProps) {
  const dateString = video.startTimeDate ? dateToStringShortMonthDateYear(video.startTimeDate) : '';
  const statusStyles = getStatusStyles(video.status)

  const { status, mutate } = useMutation({
    mutationFn: (status: number) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const requestPath = serverRoutes.videos.videoSetStatus(video.id, status);
      return fetch(baseUrl + requestPath, { method: 'PUT' });
    },
  })

  const { isEventLoading, isEventError, updateVideoEvent } = useUpdateVideoEvent();


  useEffect(() => {
    if (status === 'success') {
      fetchData();
    }
  }, [status])

  return (
    <>
      <div className={c.videoInfoContainer}>
        <div className={c.row1}>
          <p className={c.date} title={video.startTime}>{dateString}</p>
          <div className={c.icons}>
            <IconButton
              aria-label="show map"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${video.startLocation.coordinates}`, '_blank')}
            >
              <MapIcon />
            </IconButton>

            <PositionedMenu options={statusAutocompleteOptions} videoStatus={video.status}
              select={(option: number) => mutate(option)}>
              {status === 'pending' ? <CircularProgress size={20} /> : (
                <div className={c.status} title={statusLabels[video.status]}
                  style={{ backgroundColor: statusStyles.bg, boxShadow: statusStyles.boxShadow }}></div>
              )}
            </PositionedMenu>
          </div>
        </div>

        <div className={c.row2}>
          {eventsData.isFetching || eventsData.isPending || eventsData.error ? '' :
            <CheckboxesTags options={eventsData.events} checkedId={video.eventId}
              update={(newEventId: string | null, oldEventId: string | null) => updateVideoEvent(video.id, newEventId, oldEventId)} />
          }
        </div>
      </div>
    </>
  )
}
