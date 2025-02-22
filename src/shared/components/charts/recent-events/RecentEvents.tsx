import c from './RecentEvents.module.scss';
import { memo } from 'react';
import { IRecentEvent } from '../../../../types/IAnalytics';
import EventIcon from '@mui/icons-material/Event';
import { dateToString, formatEventLocation } from '../../../../utils/functions';
import { IRecentEventsProps } from '../../../../types/IRecentEventsProps';

export const RecentEvents = memo(function RecentEvents({ recentEvents }: IRecentEventsProps) {
  return (
    <>
      {recentEvents.map((event: IRecentEvent, index: number) => (
        <div key={index} className={c.eventItem}>
          <EventIcon />
          <div>
            <h3>{event.title}</h3>
            <p>{dateToString(new Date(event.startTime))}</p>
            <p>{formatEventLocation(event.locationTexts)}</p>
          </div>
        </div>
      ))}
    </>
  );
});

