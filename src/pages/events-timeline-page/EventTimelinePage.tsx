// import { useEffect, useState } from "react";
// import VideosTimeline from "../components/videos-timeline/VideosTimeline";
// import { useParams } from "react-router-dom";
// import { IEvent, IEventAndDates } from "../types/IEvent";
// import CommonError from "../components/errors/common/CommonError";

// // Implement useFetchEvent or fetchEventById()
// export default function EventTimelinePage() {
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const { eventId } = useParams<{ eventId: string }>();
//   const [event, setEvent] = useState<IEventAndDates | undefined>(undefined);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, [eventId]);

//   const fetchData = async () => {
//     console.log(eventId)
//     try {
//       const response = await fetch(baseUrl + '/events/' + eventId);
//       console.log(response)
//       if (!response.ok) {
//         throw new Error('Network error');
//       }
//       const data: IEvent = await response.json();
//       if (data) {
//         const event: IEventAndDates = {
//           ...data,
//           startTimeDate: new Date(data.startTime),
//           endTimeDate: new Date(data.endTime),
//         };
//         setEvent(event);
//         setIsLoading(false);
//         setIsError(false);
//       }
//     } catch (error: any) {
//       console.log(error.message)
//       setErrorMessage(error.message)
//       setIsError(true);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div>
//         {isLoading && (
//           <h2>Loading...</h2>
//         )}
//         {isError && <CommonError errorMessage="Event not found" />}
//         {!isLoading && !isError && event && (
//           <VideosTimeline event={event} />
//         )}
//         {event && <VideosTimeline event={event} />}
//       </div>
//     </>
//   )
// }