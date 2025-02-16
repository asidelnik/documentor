import { EventStatus, eventStatusLabels } from "../../../constants/event-constants";

interface IEventStatusIcon {
  status: number;
}

export default function EventStatusIcon({ status }: IEventStatusIcon) {
  const isActive = EventStatus.Active === status;
  const backgroundColor = isActive ? 'green' : 'hsl(0, 0%, 83%)';

  return (
    <div title={eventStatusLabels[status]} style={{
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      backgroundColor: backgroundColor
    }}></div>
  );
}