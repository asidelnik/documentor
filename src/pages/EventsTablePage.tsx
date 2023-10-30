import { Link } from "react-router-dom";

export default function EventsTablePage() {
  const events: string[] = [
    "jon-snow",
    "johnny-bravo",
    "john-wick",
  ];

  return (
    <>
      <div className="temp-event-links">
        <ul>
          {
            events.map((event: string, index: number) => (
              <li key={index}>
                <Link to={`/events/${event}`}>{event}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}