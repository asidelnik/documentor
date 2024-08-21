import c from './RootHeader.module.scss';
import { Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useHeaderBadges from '../hooks/useHeaderBadges';

type ClassNameProps = {
  isActive: boolean;
  isPending: boolean;
}

export default function RootHeader() {
  const { videos, events } = useHeaderBadges()
  const getNavLinkClass = ({ isActive, isPending }: ClassNameProps) =>
    isActive
      ? c.active
      : isPending
        ? c.pending
        : "";

  return (
    <>
      <header className={c.header}>
        <h1>Documentor</h1>
        <nav>
          <div className={c.links}>
            <div>
              <Badge badgeContent={videos} color="error" title='Count of unprocessed videos' invisible={videos === 0}>
                <NavLink to="/videos" className={getNavLinkClass}>Videos</NavLink>
              </Badge>
            </div>
            <div>
              <Badge badgeContent={events} color="error" title='Count of events with high priority' invisible={events === 0}>
                <NavLink to="/events" className={getNavLinkClass}>Events</NavLink>
              </Badge>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
