import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { CircularProgress, IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { getStatusStyles, statusAutocompleteOptions, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";
import { useUpdateVideoStatus } from "../../hooks/useUpdateVideoStatus";
import { useEffect } from "react";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";

export default function VideoInfo({ video, events, fetchData }: IVideoInfoProps) {
  const dateString = dateToStringShortMonthDateYear(video.startTime);
  const statusStyles = getStatusStyles(video.status)
  const { isStatusLoading, isStatusError, updateVideoStatus } = useUpdateVideoStatus();

  useEffect(() => {
    if (isStatusError === false) {
      fetchData();
    }
  }, [isStatusError])

  return (
    <>
      <div className={c.videoInfoContainer}>
        <div className={c.row1}>
          <p className={c.date}>{dateString}</p>
          <div className={c.icons}>
            <IconButton
              aria-label="show map"
            // onClick={showMapPopup}
            >
              <MapIcon />
            </IconButton>

            <PositionedMenu options={statusAutocompleteOptions} videoStatus={video.status} select={(option: number) => updateVideoStatus(video.id, option)}>
              {isStatusLoading ? <CircularProgress size={20} /> : (
                <div className={c.status} title={statusLabels[video.status]}
                  style={{ backgroundColor: statusStyles.bg, boxShadow: statusStyles.boxShadow }}></div>
              )}
            </PositionedMenu>
          </div>
        </div>
        <div className={c.row2}>
          <CheckboxesTags options={events} checkedIdProp={video.eventId} update={updateVideoEvent} />
        </div>
      </div>
    </>
    // TODO - Hoverable list of events
  )
}
