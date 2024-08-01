import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { CircularProgress, IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { getStatusStyles, statusAutocompleteOptions, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";
import { useUpdateVideoStatus } from "../../hooks/useUpdateVideoStatus";
import { useEffect } from "react";

export default function VideoInfo({ video, fetchData }: IVideoInfoProps) {
  const dateString = dateToStringShortMonthDateYear(video.startTime);
  const statusStyles = getStatusStyles(video.status)

  const { isLoading, isError, update } = useUpdateVideoStatus();
  useEffect(() => {
    if (isError === false) {
      fetchData();
    }
  }, [isError])

  return (
    <>
      <div className={c.videoInfoContainer}>
        <p className={c.date}>{dateString}</p>
        <div className={c.icons}>
          <IconButton
            aria-label="show map"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${video.startLocation.coordinates}`, '_blank')}
          >
            <MapIcon />
          </IconButton>

          <PositionedMenu options={statusAutocompleteOptions} videoStatus={video.status} select={(option: number) => update(video.id, option)}>
            {isLoading ? <CircularProgress size={20} /> : (
              <div className={c.status} title={statusLabels[video.status]}
                style={{ backgroundColor: statusStyles.bg, boxShadow: statusStyles.boxShadow }}></div>
            )}
          </PositionedMenu>
        </div>
      </div>
    </>
    // TODO - Hoverable list of events
  )
}
