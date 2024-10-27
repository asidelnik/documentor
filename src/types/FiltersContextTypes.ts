import { ReactNode } from 'react';

type UpdateStatusesAction = {
  type: 'update-statuses';
  payload: number[];
};

type UpdateFromDateUpdateAction = {
  type: 'update-from-date';
  payload: Date | null;
};

type UpdateToDateAction = {
  type: 'update-to-date';
  payload: Date | null;
};

type UpdateEventIdAction = {
  type: 'update-event-id';
  payload: string | undefined;
};

export type FiltersActions =
  | UpdateStatusesAction
  | UpdateFromDateUpdateAction
  | UpdateToDateAction
  | UpdateEventIdAction;

export type FiltersContextProviderProps = {
  children: ReactNode;
};
