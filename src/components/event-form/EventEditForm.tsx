import c from './EventForm.module.scss';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import { IEventEditFormProps } from "../../props/IEventFormProps";
import { EventPriority, eventPriorityNumOptions, EventStatus } from "../../constants/event-constants";
import { ChangeEvent, useState } from "react";
import { IOptionNum } from "../../types/IOptionNum";
import { IEventEditForm } from "../../types/IEvent";
import VideoList from '../video-list/VideoList';
import { editEvent } from '../../query/events/editEvent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
// import { DevTool } from '@hookform/devtools';


const validationSchema = yup.object({
  title: yup.string().required("Title is required").max(100, 'Maximum characters (100) exceded.'),
  priority: yup.number().required("Priority is required"),
  startTime: yup.date().required("Start time is required").nullable().typeError("Invalid date format"),
  description: yup.string().max(100, 'Maximum description length.'),
  status: yup.number().required("Status is required"),
});


export default function EventEditForm({ eventToEdit, onSubmit }: IEventEditFormProps) {
  const [startTimeError, setStartTimeError] = useState<DateTimeValidationError | null>(null);
  const { control, trigger, handleSubmit, setValue, setError, clearErrors,
    formState: { errors, isValid } } = useForm<IEventEditForm>({
      defaultValues: {
        title: eventToEdit?.title ?? "",
        priority: eventToEdit?.priority ?? EventPriority.Low,
        startTime: eventToEdit?.startTimeDate ?? null,
        description: eventToEdit?.description ?? '',
        status: eventToEdit?.status ?? EventStatus.Active,
      },
      resolver: yupResolver(validationSchema),
    });


  async function onSubmitHandler(data: IEventEditForm) {
    try {
      if (eventToEdit) {
        await editEvent(data, eventToEdit._id);
        onSubmit(true, 'Event updated');
      }
    } catch (error) {
      onSubmit(false, 'Submission failure');
    }
  }

  function startDateHandler(value: dayjs.Dayjs | null): void {
    if (value !== null && dayjs(value).isValid()) {
      setValue("startTime", value.toDate());
      clearErrors("startTime");
    }
    else {
      setValue("startTime", null);
      setError('startTime', { type: 'validate' })
    }
  }

  function onErrorHandler(error: DateTimeValidationError): void {
    setStartTimeError(error)
  }

  return (
    <>
      {/* <DevTool control={control} placement="top-right" /> */}
      <form className={c.eventsForm} onSubmit={handleSubmit(onSubmitHandler)}>
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
                sx={{ width: '320px' }}
              >
                {eventPriorityNumOptions.map((p: IOptionNum) => {
                  return <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>
                })}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="startTime"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                label="Start time"
                value={dayjs(field.value)}
                sx={{ width: '320px', backgroundColor: 'white' }}
                disableFuture
                onChange={(value: dayjs.Dayjs | null) => startDateHandler(value)}
                onError={onErrorHandler}
                slotProps={{
                  textField: {
                    helperText: startTimeError === 'invalidDate' ? 'Please select a valid date' : '',
                    error: !!errors.startTime,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

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
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  onChange={(e) => setValue("status", e.target.checked ? 1 : 2)}
                  checked={field.value === EventStatus.Active}
                />
              }
              label={field.value === EventStatus.Active ? 'Active' : 'Inactive'}
              sx={{ width: '100px' }}
            />
          )}
        />

        <Divider component="div" />

        <VideoList videos={eventToEdit?.videos} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ textTransform: 'capitalize', width: '100px' }}
          disabled={!isValid || Object.keys(errors).length !== 0}
        >
          Save
        </Button>
      </form>
    </>
  );
}