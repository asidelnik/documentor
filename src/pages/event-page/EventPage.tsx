import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IEvent, IEventAndDates } from "../../types/IEvent";
import { serverRoutes } from "../../server/server-routes";
export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const baseUrl = import.meta.env.VITE_BASE_URL;

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
        console.log(event)
        // setEvent(event);
        // setIsLoading(false);
        // setIsError(false);
      }
    } catch (error: any) {
      console.log(error.message)
      // setErrorMessage(error.message)
      // setIsError(true);
      // setIsLoading(false);
    }
  };

  return (
    <>
      {eventId}
    </>
  )
}