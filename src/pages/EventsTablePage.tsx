import { Link } from "react-router-dom";

export default function EventsTablePage() {
  const events: string[] = [
    "event1",
    "event2",
    "event3",
  ];

  return (
    <>
      <div>EventsTablePage</div>
      <div className="temp-event-links">
        <ul>
          {
            events.map((event: string, index: number) => (
              <li key={index}>
                <Link to={`/event-timeline/${event}`}>{event}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}