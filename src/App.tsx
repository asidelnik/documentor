import axios from "axios";
import { useState, useEffect } from "react"
import { Video, VideoFromServer } from "./types/video";
import './App.css';
// import EventTimeline from "./components/event-timeline/EventTimeLine";
import VideoList from "./components/video-list--temp/VideoList";

function App() {
  const [data, setData] = useState<Video[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const axiosFetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/videos');
        const videos: Video[] = response?.data.map((videoItem: VideoFromServer) => ({
          ...videoItem,
          startTime: new Date(videoItem.startTime),
          endTime: new Date(videoItem.endTime),
        }));
        setData(videos);
        setIsLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message)
        setIsError(true);
        setIsLoading(false);
      }
    };
    axiosFetchData();
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
            <>
              {/* {axiosData && <EventTimeline data={axiosData} />} */}
              {data && <VideoList videos={data} />}
          </>
        )}
        {isError && <p>{errorMessage}</p>}
      </div>
    </>
  )
}

export default App
