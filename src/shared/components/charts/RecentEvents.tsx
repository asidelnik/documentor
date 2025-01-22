import { memo } from 'react';
import { IRecentEvent } from '../../../types/IAnalytics';
import EventIcon from '@mui/icons-material/Event';
import { formatEventLocation } from '../../../utils/functions';

interface IRecentEventsProps {
  recentEvents: IRecentEvent[];
}

export const RecentEvents = memo(({ recentEvents }: IRecentEventsProps) => {
  return (
    <>
      {recentEvents.map((event: IRecentEvent, index: number) => (
        <div key={index} className="eventItem">
          <EventIcon />
          <div>
            <h3>{event.title}</h3>
            <p>{event.startTime.toDateString()}</p>
            <p>{formatEventLocation(event.locationTexts)}</p>
          </div>
        </div>
      ))}
    </>
  );
});

