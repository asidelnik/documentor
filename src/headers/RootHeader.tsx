import c from './RootHeader.module.scss';
import { Badge } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { IHeaderBadgeCounts } from '../types/IHeaderBadgeCounts';
import { IClassNameProps } from '../props/IClassNameProps';
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

  const getNavLinkClass = ({ isActive }: IClassNameProps) => isActive ? c.active : "";

  return (
    <>
      <header className={c.header}>
        <p className={c.logoType}>Documentor</p>
        <nav>
          <div className={c.links}>
            <div>
              <Badge
                badgeContent={data?.videos}
                color="error"
                invisible={isFetching || isPending || error !== null}
                title='Count of unprocessed videos'
                sx={{ cursor: 'help' }}
              >
                <NavLink to="/videos" className={getNavLinkClass}>
                  <SmartDisplayIcon />
                  Videos
                </NavLink>
              </Badge>
            </div>
            <div>
              <Badge
                badgeContent={data?.events}
                color="error"
                invisible={isFetching || isPending || error !== null}
                title='Count of active high priority events'
                sx={{ cursor: 'help' }}
              >
                <NavLink to="/events" className={getNavLinkClass}>
                  <FolderSharedIcon />
                  Events
                </NavLink>
              </Badge>
            </div>
            <div>
              <NavLink to="/analytics" className={getNavLinkClass}>
                <AssessmentIcon />
                Analytics
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}