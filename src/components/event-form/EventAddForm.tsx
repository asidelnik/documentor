import c from './EventForm.module.scss';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import { IEventAddFormProps } from "../../props/IEventFormProps";
import { EventPriority, eventPriorityNumOptions, EventStatus, SelectMenuProps } from "../../constants/event-constants";
import { ChangeEvent, ReactNode, useState } from "react";
import { IOptionNum } from "../../types/IOptionNum";
import { IEventAddForm } from "../../types/IEvent";
import { addEvent } from '../../query/events/addEvent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import { filtersHelperTexts } from '../../constants/filters-helper-texts';
import { DatePickerParent } from '../../enums/DatePickerParent';
import { IOptionStr } from '../../types/IOptionStr';
import { fetchEventTypes } from '../../query/events/fetchEventTypes';
import { useQuery } from '@tanstack/react-query';
// import { FilterParent } from '../../enums/FilterParent';
// import { DevTool } from '@hookform/devtools';



const validationSchema = yup.object({
  title: yup.string().required("Title is required").max(100, 'Maximum characters (100) exceded.'),
  eventTypes: yup.array().of(yup.string().required()).min(1, 'At least one type is required'),
  priority: yup.number().required("Priority is required"),
  startTime: yup.date().required("Start time is required"),
  description: yup.string().max(100, 'Maximum description length.'),
  status: yup.number().required("Status is required"),
});

export default function EventAddForm({ onSubmit }: IEventAddFormProps) {
  const [startTimeError, setStartTimeError] = useState<DateTimeValidationError | null>(null);
  const { control, trigger, setValue, setError, clearErrors, handleSubmit,
    formState: { errors, isValid } } = useForm<IEventAddForm>({
      defaultValues: {
        title: "",
        eventTypes: undefined,
        priority: EventPriority.Low,
        startTime: undefined,
        description: '',
        status: EventStatus.Active,
      },
      resolver: yupResolver(validationSchema),
    });

  const { data: eventTypes, } = useQuery<IOptionStr[]>({
    queryKey: ['event-types'],
    queryFn: ({ signal }) => fetchEventTypes(signal),
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  async function onSubmitHandler(data: IEventAddForm) {
    try {
      await addEvent(data);
      onSubmit(true, 'Event added');
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
      setError('startTime', { type: 'validate' })
    }
  }

  function onErrorHandler(error: DateTimeValidationError): void {
    setStartTimeError(error)
  }

  function eventTypesOnChange(event: SelectChangeEvent<string[]>): void {
    const { target: { value: selectedEventTypes } } = event;

    if (Array.isArray(selectedEventTypes)) {
      setValue("eventTypes", selectedEventTypes);
    }
  }

  function getRenderValue(ids: Array<string>): ReactNode {
    const selectedLabels: string[] = ids.length > 0 && eventTypes && eventTypes.length > 0 ?
      ids.map((id) => eventTypes.find(option => option.id === id)?.label).filter((label) => label !== undefined) : [];

    return selectedLabels.join(', ')
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
          name="eventTypes"
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel id="eventTypes">Types</InputLabel>
              <Select
                id="eventTypes"
                labelId="eventTypes"
                multiple
                value={field.value ?? []}
                onChange={eventTypesOnChange}
                label="Types"
                sx={{ width: '320px' }}
                input={<OutlinedInput label='Types' />}
                renderValue={getRenderValue}
                MenuProps={SelectMenuProps}
                size='medium'
              >
                {(eventTypes ?? []).map((option: IOptionStr) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Checkbox checked={(field.value ?? []).indexOf(option.id) > -1} />
                    <ListItemText primary={option.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          render={() => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                label="Start time"
                value={undefined}
                sx={{ width: '320px', backgroundColor: 'white' }}
                disableFuture
                onChange={(value: dayjs.Dayjs | null) => startDateHandler(value)}
                onError={onErrorHandler}
                slotProps={{
                  textField: {
                    helperText: filtersHelperTexts(startTimeError, DatePickerParent.Form), //!isValid &&
                    error: !!errors.startTime,
                    onBlur: () => trigger('startTime'),
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
                  disabled
                />
              }
              label={field.value === EventStatus.Active ? 'Active' : 'Inactive'}
              sx={{ width: '100px' }}
            />
          )}
        />

        <Divider component="div" />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          // autoFocus
          sx={{ textTransform: 'capitalize', width: '100px' }}
          disabled={!isValid || Object.keys(errors).length !== 0}
        >
          Save
        </Button>
      </form>
    </>
  );
}