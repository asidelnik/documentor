import { useState, useEffect } from 'react';
import { serverRoutes } from './server-routes';
import { VideoFromServer } from '../types/video';
import { EventFromServer } from '../types/event';

type DataState = {
  filteredVideos: VideoFromServer[];
  filteredEvents: EventFromServer[];
  eventWithVideos?: EventFromServer;
};

export default function useFetchDataTests() {
  const [data, setData] = useState<DataState>({ filteredVideos: [], filteredEvents: [], eventWithVideos: undefined });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = 'http://localhost:3000';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filteredVideosRes = await fetch(baseUrl + serverRoutes.getFilteredVideos({
          fromDate: '2022-01-01',
          toDate: '2022-12-31',
          lat: 40.7128,
          lon: 74.0060,
          radius: 10,
          status: 1,
          eventId: true,
          page: 1,
          limit: 10,
          tags: ['tag1', 'tag2'],
          tagsJoined: ''
        }));
        const filteredVideos = await filteredVideosRes.json();

        const filteredEventsRes = await fetch(baseUrl + serverRoutes.getFilteredEvents({
          fromDate: '2022-01-01',
          toDate: '2022-12-31',
          lat: 40.7128,
          lon: 74.0060,
          radius: 10,
          status: 1,
          page: 1,
          limit: 10,
          tags: ['tag1', 'tag2'],
          tagsJoined: ''
        }));
        const filteredEvents = await filteredEventsRes.json();

        const eventWithVideosRes = await fetch(baseUrl + serverRoutes.getEventWithVideos(1));
        const eventWithVideos = await eventWithVideosRes.json();

        setData({ filteredVideos, filteredEvents, eventWithVideos });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}