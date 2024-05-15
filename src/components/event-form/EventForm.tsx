// import c from './EventForm.module.scss';

import { EventFormProps } from "../../props/EventFormProps";

export default function EventForm({ eventId }: EventFormProps) {
  return (
    <>
      <p>{eventId && eventId}</p>
    </>
  )
}

/*
title: string;
  description: string;
  location: string;
  status: EventStatusEnum;
 */