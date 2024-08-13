// import c from './EventForm.module.scss';
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { IEventFormProps } from "../../props/IEventFormProps";
import { ChangeEvent } from "react";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { eventPriorityStrOptions } from "../../constants/event-constants";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import { EventsActionTitle } from "../../enums/EventsActionTitle";

export default function EventForm({ eventId, actionTitle }: IEventFormProps) {
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
  const titleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const priorityHandler = (id: string | null) => setPriority(id);
  const fromDateHandler = (fromDate: Date) => setFromDate(fromDate);
  const toDateHandler = (toDate: Date) => setToDate(toDate);
  const statusHandler = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => setStatus(checked);

  return (
    <>
      <p>{eventId && eventId}</p>
      {/* <form onSubmit={handleSubmit}>      </form> */}
      <TextField
        id="title"
        label="Event title"
        variant="outlined"
        onChange={titleHandler}
        sx={{ width: '400px' }}
      />

      <CheckboxesTags
        options={eventPriorityStrOptions}
        checkedId={null}
        update={priorityHandler}
        isDisabled={false}
        placeholder='Priority'
      />

      <DateTimeRangePicker
        fromDateProp={undefined}
        toDateProp={undefined}
        updateFromDate={fromDateHandler}
        updateToDate={toDateHandler}
      />

      <TextField
        id="description"
        label="Description"
        multiline
        rows={4}
        defaultValue=""
      />

      <FormControlLabel control={
        <Switch
          onChange={statusHandler}
          disabled={actionTitle === EventsActionTitle.Add}
        />
      } label={isOpen ? 'Close' : 'Open'} />
    </>
  )
}