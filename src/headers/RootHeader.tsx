import c from './RootHeader.module.scss';
import { Link } from 'react-router-dom';

export default function RootHeader() {
  return (
    <>
      <header className={c.header}>
        <h1>Documentor</h1>
        <nav>
          <div className={c.links}>
            <div>
              <Link to="/videos-processing">Processing</Link>
            </div>
            <div>
              <Link to="/events-table">Events</Link>
            </div>
            <div>
              <Link to="/event-timeline">Timeline</Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
