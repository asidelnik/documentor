import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { IconButton } from "@mui/material";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { getStatusStyles, statusAutocompleteOptions, statusLabels } from "../../constants/video-status";
import PositionedMenu from "../../shared/components/positioned-menu/PositionedMenu";

export default function VideoInfo({ video }: IVideoInfoProps) {
  const dateString = dateToStringShortMonthDateYear(video.startTime);
  const statusStyles = getStatusStyles(video.status)

  function updateVideoStatus(selectedId: number) {
    console.log(selectedId);
  }

  // TODO - Hoverable list of events
  return (
    <>
      <div className={c.videoInfoContainer}>
        <p className={c.date}>{dateString}</p>
        <div className={c.icons}>
          <IconButton
            aria-label="show map"
          // onClick={showMapPopup}
          >
            <MapIcon />
          </IconButton>

          <PositionedMenu options={statusAutocompleteOptions} videoStatus={video.status} select={updateVideoStatus}>
            <div className={c.status} title={statusLabels[video.status]}
              style={{ backgroundColor: statusStyles.bg, boxShadow: statusStyles.boxShadow }}></div>
          </PositionedMenu>
        </div>
      </div>
    </>
  )
}
