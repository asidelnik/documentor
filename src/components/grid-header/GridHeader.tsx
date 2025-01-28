import c from "./GridHeader.module.scss";
import { IconButton, Tooltip } from "@mui/material";
import { IGridHeaderProps } from "../../props/IVideosGridProps";
import CloseIcon from '@mui/icons-material/Close';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';


export default function GridHeader({
  videosCount,
  eventId,
  eventTitle,
  selectedVideos,
  unselectAllVideos,
  addSelectedVideosToEvent
}: IGridHeaderProps) {
  return (
    <>
      <div className={c.gridHeader}>
        <div className={c.headerTitles}>
          <div>{videosCount} videos </div>
          {eventId && <h3>{eventTitle || ''}</h3>}
        </div>

        {eventId && (
          <div className={c.headerActions}>
            <div>{`${selectedVideos.length} selected`}</div>
            <IconButton
              aria-label="Unselect all videos button"
              disabled={selectedVideos.length === 0}
              onClick={unselectAllVideos}
              color="info"
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Tooltip
              title="Add videos to event"
              placement="top-end">
              <IconButton
                aria-label="Add videos to event button"
                disabled={selectedVideos.length === 0}
                onClick={addSelectedVideosToEvent}
                color="primary"
              >
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </>
  )
}
