import c from './EventForm.module.scss';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import { IEventFormProps } from "../../props/IEventFormProps";
import { EventPriority, eventPriorityNumOptions, EventStatus } from "../../constants/event-constants";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import { EventsAction } from "../../enums/EventsAction";
import { ChangeEvent } from "react";
import { IOptionNum } from "../../types/IOptionNum";
import { IEventForm } from "../../types/IEvent";

// Define validation schema
const validationSchema = yup.object({
  title: yup.string().required("Title is required").max(100, 'Maximum characters (100) exceded.'),
  priority: yup.number().required("Priority is required"),
  startTime: yup.date().required("From date is required"),
  endTime: yup.date(),
  description: yup.string().max(100, 'Maximum description length.'),
  status: yup.number().required("Status is required"),
});

export default function EventForm({ eventsAction, eventToEdit }: IEventFormProps) {
  const { control, getValues, trigger, handleSubmit, setValue, formState: { errors, isValid } } = useForm<IEventForm>({
    defaultValues: {
      title: eventToEdit?.title ?? "",
      priority: eventToEdit?.priority ?? EventPriority.Low,
      startTime: eventToEdit?.startTimeDate ?? new Date(),
      endTime: eventToEdit?.endTimeDate ?? undefined,
      description: eventToEdit?.description ?? '',
      status: eventToEdit?.status ?? EventStatus.Active,
      // videoIds: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form data submitted:", data);
  };

  return (
    <form className={c.eventsForm} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="title"
            label="Title"
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            value={field.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue("title", event.target.value)}
            sx={{ width: '630px' }}
            onBlur={() => trigger('title')}
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={field.value}
              label="Priority"
              onChange={(event: SelectChangeEvent<number>) => setValue("priority", Number(event.target.value))}
              sx={{ width: '300px' }}
            >
              {eventPriorityNumOptions.map((p: IOptionNum) => {
                return <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>
              })}
            </Select>
          </FormControl>
        )}
      />

      <div className={c.datePickersContainer}>
        <DateTimeRangePicker
          fromDateProp={getValues("startTime")}
          toDateProp={getValues("endTime")}
          updateFromDate={(fromDate: Date) => setValue("startTime", fromDate)}
          updateToDate={(toDate: Date) => setValue("endTime", toDate)}
        />
      </div>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            value={field.value}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setValue("description", event.target.value)}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            sx={{ width: '630px' }}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControlLabel control={
            <Switch
              {...field}
              onChange={(e) => setValue("status", e.target.checked ? 1 : 2)}
              checked={field.value === EventStatus.Active}
              disabled={eventsAction === EventsAction.Add}
            />
          } label={field.value ? 'Active' : 'Inactive'} />
        )}
      />

      <Divider component="div" />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        autoFocus
        sx={{ textTransform: 'capitalize', width: '100px' }}
        disabled={!isValid}
      >
        Save
      </Button>
    </form>
  );
}