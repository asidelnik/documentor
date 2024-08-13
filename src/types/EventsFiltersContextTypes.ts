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

type UpdatePageAction = {
  type: 'update-page';
  payload: number;
};

type UpdateLimitAction = {
  type: 'update-limit';
  payload: number;
};

export type EventsFiltersActions =
  | UpdateFromDateUpdateAction
  | UpdateToDateAction
  | UpdatePriorityAction
  | UpdateFreeTextAction
  | UpdatePageAction
  | UpdateLimitAction;

export type EventsFiltersContextProviderProps = {
  children: ReactNode;
};
