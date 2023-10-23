import axios from "axios";
import { useState, useEffect } from "react"
import { Video } from "./types/video";
import './App.css';

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
        ) : (<>
          {axiosData && (
            <ul>
                {axiosData?.map((video: Video) => (<>
                  {video.orientation == "Landscape" ? (
                    <iframe
                      key={video.id}
                      width="560"
                      height="315"
                      src={video?.url}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    // frameborder="0"
                    // allowfullscreen
                    ></iframe>

                  ) : (
                    <iframe
                      key={video.id}
                      width="315"
                      height="560"
                      src={video?.url}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    // frameborder="0"
                    // allowfullscreen
                    ></iframe>
                  )}
                </>))}
            </ul>
            )}
          </>
        )}
        {axiosError && <p>{axioserrorMessage}</p>}
      </div>
    </>
  )
}

export default App
