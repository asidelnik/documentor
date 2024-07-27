import { ReactNode } from 'react';

type UpdateStatusesAction = {
  type: 'update-statuses';
  payload: number[];
};

type UpdateFromDateUpdateAction = {
  type: 'update-from-date';
  payload: Date;
};

type UpdateToDateAction = {
  type: 'update-to-date';
  payload: Date;
};

export type FiltersActions =
  | UpdateStatusesAction
  | UpdateFromDateUpdateAction
  | UpdateToDateAction;

export type FiltersContextProviderProps = {
  children: ReactNode;
};
