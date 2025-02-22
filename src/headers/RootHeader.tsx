import c from './RootHeader.module.scss';
import { Badge } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import { IHeaderBadgeCounts } from '../types/IHeaderBadgeCounts';
import { fetchBadges } from '../query/header/fetchBadges';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function RootHeader() {
  const {
    isFetching,
    isPending,
    error,
    data
  } = useQuery<IHeaderBadgeCounts>({
    queryKey: ['badges'],
    queryFn: ({ signal }) => fetchBadges(signal)
  });

  return (
    <>
      <header className={c.header}>
        <p className={c.logoType}>Documentor</p>
        <nav>
          <div className={c.links}>
            <div>
              <Badge
                badgeContent={data?.events}
                color="error"
                invisible={isFetching || isPending || error !== null}
                title='Count of active high priority events'
                sx={{ cursor: 'help' }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <NavLink
                  to="/events"
                  className={(props: NavLinkRenderProps) => props.isActive ? c.eventsBtn + ' ' + c.active : c.eventsBtn}>
                  <FolderSharedIcon sx={{ fill: "hsl(235, 82%, 66%)" }} />
                  Events
                </NavLink>
              </Badge>
            </div>
            <div>
              <Badge
                badgeContent={data?.videos}
                color="error"
                invisible={isFetching || isPending || error !== null}
                title='Count of unprocessed videos'
                sx={{ cursor: 'help' }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <NavLink
                  to="/videos"
                  className={(props: NavLinkRenderProps) => props.isActive ? c.videosBtn + ' ' + c.active : c.videosBtn}>
                  <SmartDisplayIcon sx={{ fill: "hsl(200, 96%, 51%)" }} />
                  Videos
                </NavLink>
              </Badge>
            </div>
            <div>
              <NavLink
                to="/analytics"
                className={(props: NavLinkRenderProps) => + props.isActive ? c.analyticsBtn + ' ' + c.active : c.analyticsBtn}>
                <AssessmentIcon sx={{ fill: "hsl(160, 62%, 54%)" }} />
                Analytics
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}