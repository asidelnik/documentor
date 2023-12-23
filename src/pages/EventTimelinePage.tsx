import { useEffect, useState } from "react";
import axios from "axios";
import VideoList from "../components/video-list/VideoList";
import { useParams } from "react-router-dom";
import { EventType } from "../types/event";
import { VideoFromServer } from "../types/video";
import CommonError from "../components/errors/common/CommonError";

export default function EventTimelinePage() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { eventId } = useParams<{ eventId: string }>();
  const [data, setData] = useState<EventType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axiosFetchData();
  }, [eventId]);

  const axiosFetchData = async () => {
    try {
      const response = await axios.get(baseUrl + 'events/' + eventId);
      const data = response?.data;
      if (data) {
        const event: EventType = {
          ...response?.data,
          startTime: new Date(response?.data.startTime),
          endTime: new Date(response?.data.endTime),
          videos: response?.data.videos.map((video: VideoFromServer) => ({
            ...video,
            startTime: new Date(video.startTime),
            endTime: new Date(video.endTime),
          })),
        };
        setData(event);
        setIsLoading(false);
      }
    } catch (error: any) {
      setErrorMessage(error.message)
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        {isLoading && (
          <h2>Loading...</h2>
        )}
        {isError && <CommonError errorMessage="Event not found" />}
        {!isLoading && !isError && data && (
          <VideoList event={data} />
        )}
        {data && <VideoList event={data} />}
      </div>
    </>
  )
}