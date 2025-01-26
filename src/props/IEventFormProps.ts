import { IEventAndDates } from '../types/IEvent';

export interface IEventAddFormProps {
  onSubmit: (isSuccess: boolean, message: string) => void;
}

export interface IEventEditFormProps {
  eventToEdit: IEventAndDates | null;
  eventId?: string;
  onSubmit: (isSuccess: boolean, message: string) => void;
}
