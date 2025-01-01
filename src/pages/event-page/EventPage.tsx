import c from './EventPage.module.scss';
import { useEffect, useState, MouseEvent, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { IEvent, IEventAndDates } from "../../types/IEvent";
import { serverRoutes } from "../../server/server-routes";
import { dateToString, secondsToDurationString } from "../../utils/functions";
import { eventPriorityLabels, eventStatusLabels } from '../../constants/event-constants';
import VideoList from '../../components/video-list/VideoList';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MapIcon from '@mui/icons-material/Map';
import { IconButton, Tooltip } from '@mui/material';
import EventPriorityIcon from '../../shared/components/EventPriorityIcon';
import EventStatusIcon from '../../shared/components/EventStatusIcon';
import { IVideo } from '../../types/IVideo';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import firstIcon from '../../assets/icons/location_on_first.svg';
import icon from '../../assets/icons/location_on.svg';


export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [event, setEvent] = useState<IEventAndDates | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sectionScroll, setSectionScroll] = useState('#texts');
  const eventStartTime = event?.startTimeDate && dateToString(event?.startTimeDate);
  const timeString = secondsToDurationString(event?.duration);
  const videos = event?.videos.map(video => ({ ...video, startTimeDate: new Date(video.startTime) })) ?? [];
  const isProgrammaticScroll = useRef<boolean>(false);

  const customIconFirst = new L.Icon({
    iconUrl: firstIcon,
    iconSize: [34, 41],
    iconAnchor: [14, 41],
    popupAnchor: [1, -34],
  });

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [34, 41],
    iconAnchor: [14, 41],
    popupAnchor: [1, -34],
  });

  // useEffect(() => {
  //   const main = document.querySelector("main");
  //   console.log('scrolling');
  //   if (main) {
  //     main.addEventListener('scroll', scrollHandler);
  //     return () => main.removeEventListener('scroll', scrollHandler);
  //   }
  // }, []);

  useEffect(() => {
    if (eventId !== undefined) fetchData(eventId);
  }, [eventId]);

  const scrollHandler = () => {
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false;
      return;
    }
    console.log('scrolling');
    const sections = document.querySelectorAll("main > section");
    let currentSection = sectionScroll;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= 0) {
        currentSection = `#${section.id}`;
      }
    });
    setSectionScroll(currentSection);
  };

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

  function scrollByMenuHandler(sectionId: string, e: MouseEvent<HTMLButtonElement>): void {
    const main = document.querySelector("main");
    const element: HTMLElement | null = document.querySelector(sectionId);
    if (element && main) {
      const elementPosition = element.offsetTop - main.offsetTop;
      isProgrammaticScroll.current = true;

      main.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setSectionScroll(sectionId);
    }
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
                      onClick={(e: MouseEvent<HTMLButtonElement>) => scrollByMenuHandler('#texts', e)}>
                      <ArticleIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Timeline">
                    <IconButton aria-label="Videos timeline"
                      className={sectionScroll === '#videos-timeline' ? `${c.icon} ${c.active}` : c.icon}
                      onClick={(e: MouseEvent<HTMLButtonElement>) => scrollByMenuHandler('#videos-timeline', e)}>
                      <VideoLibraryIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Map">
                    <IconButton aria-label="Map"
                      className={sectionScroll === '#event-map' ? `${c.icon} ${c.active}` : c.icon}
                      onClick={(e: MouseEvent<HTMLButtonElement>) => scrollByMenuHandler('#event-map', e)}>
                      <MapIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div style={{ width: '46px', height: '46px' }}></div>
              </nav>

              <main onScroll={scrollHandler}>
                <section className={c.texts} id="texts">
                  <h1>{event.title}</h1>
                  {event.description && <p className={c.description}>{event.description}</p>}
                  <div className={c.details}>
                    <div>
                      <p className={c.label}>Priority</p>
                      <p className={`${c.data} ${c.tag} ${eventPriorityLabels[event.priority]}`}>
                        <EventPriorityIcon priority={event.priority} />
                        {eventPriorityLabels[event.priority]}
                      </p>
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
                      <div className={`${c.data} ${c.tag} ${eventStatusLabels[event.status]}`}>
                        <EventStatusIcon status={event.status} />
                        {eventStatusLabels[event.status]}
                      </div>
                    </div>
                  </div>
                </section>

                <section id="videos-timeline">
                  <VideoList videos={videos} />
                </section>

                <section className={c.mapContainer} id="event-map">
                  <h3>Event map</h3>
                  <MapContainer
                    bounds={event.videos.map(video => [video.startLocation.coordinates[0], video.startLocation.coordinates[1]])}
                    style={{ width: '100%', height: '600px' }}>
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
                    />
                    {event.videos.map((video: IVideo, index: number) => (
                      <Marker
                        key={video._id}
                        icon={index === 0 ? customIconFirst : customIcon}
                        position={[video.startLocation.coordinates[0], video.startLocation.coordinates[1]]}>
                        <Popup>
                          {video.startLocation.type}
                        </Popup>
                      </Marker>
                    ))}
                    <Polyline
                      positions={event.videos.map(video => [video.startLocation.coordinates[0], video.startLocation.coordinates[1]])}
                      pathOptions={{ color: 'blue', weight: 5 }}
                    />
                  </MapContainer>
                </section>
              </main>
            </div>
          </>
        )
        }
      </div >
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {errorMessage}</p>}
      { }
    </>
  )
}