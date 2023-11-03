import { useState, useEffect } from 'react';
import { serverRequests } from './server-requests';

type DataState = {
  filteredVideos: any[];
  filteredEvents: any[];
  eventWithRelateVideos?: any;
};

export default function useFetchDataTests() {
  const [data, setData] = useState<DataState>({ filteredVideos: [], filteredEvents: [], eventWithRelateVideos: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const testUrl = 'http://localhost:3000';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filteredVideosRes = await fetch(testUrl + serverRequests.getFilteredVideosWithEvent(1, 10));
        const filteredVideos = await filteredVideosRes.json();

        const filteredEventsRes = await fetch(testUrl + serverRequests.getFilteredEvents(1, 10));
        const filteredEvents = await filteredEventsRes.json();

        const eventWithRelateVideosRes = await fetch(testUrl + serverRequests.getEventWithRelatedVideos(1));
        const eventWithRelateVideos = await eventWithRelateVideosRes.json();

        setData({ filteredVideos, filteredEvents, eventWithRelateVideos });
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