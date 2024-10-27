import { ReactNode } from 'react';

type UpdateFromDateUpdateAction = {
  type: 'update-from-date';
  payload: Date | null;
};

type UpdateToDateAction = {
  type: 'update-to-date';
  payload: Date | null;
};

type UpdatePriorityAction = {
  type: 'update-priority';
  payload: number[];
};

type UpdateFreeTextAction = {
  type: 'update-free-text';
  payload: string;
};

type UpdateStatusAction = {
  type: 'update-status';
  payload: number[];
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
  | UpdateStatusAction
  | UpdatePageAction
  | UpdateLimitAction;

export type EventsFiltersContextProviderProps = {
  children: ReactNode;
};
