import c from './EventPage.module.scss';
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { IEvent, IEventAndDates } from "../../types/IEvent";
import { serverRoutes } from "../../server/server-routes";
import { dateToString, secondsToTimeString } from "../../utils/functions";
import { eventPriorityLabels, eventStatusLabels } from '../../constants/event-constants';
import VideoList from '../../components/video-list/VideoList';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MapIcon from '@mui/icons-material/Map';
import { IconButton, Tooltip } from '@mui/material';
import mapImage from '../../assets/images/map.png';


export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [event, setEvent] = useState<IEventAndDates | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sectionScroll, setSectionScroll] = useState('#texts');
  const eventStartTime = event?.startTimeDate && dateToString(event?.startTimeDate);
  const timeString = secondsToTimeString(event?.duration);
  const videos = event?.videos.map(video => ({ ...video, startTimeDate: new Date(video.startTime) })) ?? [];

  useEffect(() => {
    if (eventId !== undefined) fetchData(eventId);
  }, [eventId]);

  const fetchData = async (id: string) => {
    try {
      const response = await fetch(baseUrl + serverRoutes.events.fetchEvent(id));
      if (!response.ok) {
        throw new Error('Network error');
      }

      const data: IEvent = await response.json();
      if (data) {
        const event: IEventAndDates = {
          ...data,
          startTimeDate: new Date(data.startTime),
          endTimeDate: new Date(data.endTime),
        };
        setEvent(event);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error: any) {
      console.log(error.message)
      setErrorMessage(error.message)
      setIsError(true);
      setIsLoading(false);
    }
  };

  function scrollHandler(sectionId: string): void {
    const main = document.querySelector("main");
    const element = document.querySelector(sectionId);
    if (element && main) {
      const elementPosition = element.getBoundingClientRect().y;
      console.log(sectionId, element.getBoundingClientRect().y);

      main.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setSectionScroll(sectionId);
    }
    // element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div>
        {event && (
          <>
            <div className={c.columnsLayout}>
              <nav>
                <NavLink to="/events">
                  <IconButton aria-label="back to events" className={c.icon}>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </NavLink>

                <div className={c.menu}>
                  <Tooltip title="Details">
                    <IconButton aria-label="Event texts"
                      className={sectionScroll === '#texts' ? `${c.icon} ${c.active}` : c.icon}
                      onClick={() => scrollHandler('#texts')}>
                      <ArticleIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Timeline">
                    <IconButton aria-label="Videos timeline"
                      className={sectionScroll === '#videos-timeline' ? `${c.icon} ${c.active}` : c.icon}
                      onClick={() => scrollHandler('#videos-timeline')}>
                      <VideoLibraryIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Map">
                    <IconButton aria-label="Map"
                      className={sectionScroll === '#event-map' ? `${c.icon} ${c.active}` : c.icon}
                      onClick={() => scrollHandler('#event-map')}>
                      <MapIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div style={{ width: '46px', height: '46px' }}></div>
              </nav>

              <main>
                <div className={c.texts} id="texts">
                  <h1>{event.title}</h1>
                  {event.description && <p className={c.description}>{event.description}</p>}
                  <div className={c.details}>
                    <div>
                      <p className={c.label}>Priority</p>
                      <p className={c.data}>{eventPriorityLabels[event.priority]}</p>
                    </div>
                    <div>
                      <p className={c.label}>Start time</p>
                      <p className={c.data}>{eventStartTime}</p>
                    </div>
                    <div>
                      <p className={c.label}>Duration</p>
                      <p className={c.data}>{timeString}</p>
                    </div>
                    <div>
                      <p className={c.label}>Location</p>
                      <p className={c.data}>{event.locationName}</p>
                    </div>
                    <div>
                      <p className={c.label}>Status</p>
                      <p className={c.data}>{eventStatusLabels[event.status]}</p>
                    </div>
                  </div>
                </div>

                <div id="videos-timeline">
                  <VideoList videos={videos} />
                </div>

                <div className={c.mapContainer} id="event-map">
                  <h3>Event map</h3>
                  <img src={mapImage} alt="Map placeholder image" style={{ width: '100%', height: '100%' }} />
                </div>
              </main>
            </div>
          </>
        )}
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {errorMessage}</p>}
      { }
    </>
  )
}