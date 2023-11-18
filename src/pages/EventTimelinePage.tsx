import { useEffect, useState } from "react";
import axios from "axios";
import VideoList from "../components/video-list/VideoList";
import { useParams } from "react-router-dom";
import { EventType } from "../types/event";
import { VideoFromServer } from "../types/video";
import CommonError from "../components/errors/common/CommonError";

export default function EventTimelinePage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [data, setData] = useState<EventType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const axiosFetchData = async () => {
      try {
        const url = `http://localhost:3002/events/${eventId}`;
        const response = await axios.get(url);
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
    axiosFetchData();
  }, [eventId]);

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
      </div>
    </>
  )
}