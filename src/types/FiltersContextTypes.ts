import { ReactNode } from 'react';

type UpdateStatusesAction = {
  type: 'update-statuses';
  payload: number[];
};

type UpdateFromDateUpdateAction = {
  type: 'update-from-date';
  payload: string;
};

type UpdateToDateAction = {
  type: 'update-to-date';
  payload: string;
};

export type FiltersActions =
  | UpdateStatusesAction
  | UpdateFromDateUpdateAction
  | UpdateToDateAction;

export type FiltersContextProviderProps = {
  children: ReactNode;
};
