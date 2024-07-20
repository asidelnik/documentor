import c from "./VideoInfo.module.scss";
import { IVideoInfoProps } from "../../props/IVideoInfoProps";
import MapIcon from '@mui/icons-material/Map';
import { IconButton } from "@mui/material";
import { dateToStringDDMMYYYY, getStatusColor } from "../../utils/functions";
export default function VideoInfo({ video }: IVideoInfoProps) {
  const dateString = dateToStringDDMMYYYY(video.startTime);
  const statusColor = getStatusColor(video.status)

// TODO - Hoverable list of events
  return (
    <>
      <div className={c.container}>
        <p>{dateString}</p>
        <IconButton
          aria-label="show map"
        // onClick={showMapPopup}
        >
          <MapIcon />
        </IconButton>

        <IconButton
          aria-label="status"
        // onClick={updateStatus}
        >
          <div className={c.status} style={{ backgroundColor: statusColor }}></div>
        </IconButton>
      </div>
    </>
  )
}
