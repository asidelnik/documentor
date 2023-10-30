import c from './RootHeader.module.scss';
import { NavLink } from 'react-router-dom';

type ClassNameProps = {
  isActive: boolean;
  isPending: boolean;
}

export default function RootHeader() {

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
              <NavLink to="/videos-processing" className={getNavLinkClass}>Processing</NavLink>
            </div>
            <div>
              <NavLink to="/events-table" className={getNavLinkClass}>Events</NavLink>
            </div>
            <div>
              <NavLink to="/event-timeline" className={getNavLinkClass}>Timeline</NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
