import axios from "axios";
import { useState, useEffect } from "react"
import { Video } from "./types/video";
import './App.css';
import VideoTimeline from "./components/video-timeline/VideoTimeLine";

function App() {
  const [axiosData, setAxiosData] = useState<Video[] | undefined>(undefined);
  const [axiosLoading, setAxiosLoading] = useState(true);
  const [axiosError, setAxiosError] = useState(false);
  const [axioserrorMessage, setAxiosErrorMessage] = useState('');

  useEffect(() => {
    const axiosFetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/videos');
        console.log('axios ', response)
        setAxiosData(response?.data);
        setAxiosLoading(false);
      } catch (error: any) {
        setAxiosErrorMessage(error.message)
        setAxiosError(true);
        setAxiosLoading(false);
      }
    };
    axiosFetchData();
  }, []);

  return (
    <>
      <div>
        {axiosLoading ? (
          <h2>Loading...</h2>
        ) : (
            <>
              {axiosData && <VideoTimeline data={axiosData} />}
          </>
        )}
        {axiosError && <p>{axioserrorMessage}</p>}
      </div>
    </>
  )
}

export default App
