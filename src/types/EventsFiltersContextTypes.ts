import { ReactNode } from 'react';

type UpdateFromDateUpdateAction = {
  type: 'update-from-date';
  payload: Date;
};

type UpdateToDateAction = {
  type: 'update-to-date';
  payload: Date;
};

type UpdatePriorityAction = {
  type: 'update-priority';
  payload: number[];
};

type UpdateFreeTextAction = {
  type: 'update-free-text';
  payload: string;
};

export type EventsFiltersActions =
  | UpdateFromDateUpdateAction
  | UpdateToDateAction
  | UpdatePriorityAction
  | UpdateFreeTextAction;

export type EventsFiltersContextProviderProps = {
  children: ReactNode;
};
