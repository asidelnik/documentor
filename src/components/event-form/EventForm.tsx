// import c from './EventForm.module.scss';
import { TextField } from "@mui/material";
import { EventFormProps } from "../../props/EventFormProps";
import { ChangeEvent } from "react";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { eventPriorityStrOptions } from "../../constants/event-constants";


export default function EventForm({ eventId }: EventFormProps) {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  // });
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevents the default form submission behaviour
  //   // Process and send formData to the server or perform other actions
  //   console.log('Form data submitted:', formData);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const eventTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setEventTitle(event.target.value);
  const eventUpdateHandler = (newEventId: string | null) => setVideoEvent({ videoId: video.id, newEventId: newEventId, oldEventId: video.eventId });

  return (
    <>
      <p>{eventId && eventId}</p>
      {/* <form onSubmit={handleSubmit}>      </form> */}
      <TextField
        id="title"
        label="Event title"
        variant="outlined"
        onChange={eventTitleHandler}
        sx={{ width: '400px' }}
      />

      <CheckboxesTags
        options={eventPriorityStrOptions}
        checkedId={null}
        update={eventUpdateHandler}
        isDisabled={false}
        placeholder='Priority'
      />



    </>
  )
}

/*
title: string;
  description: string;
  location: string;
  status: EventStatusEnum;
 */