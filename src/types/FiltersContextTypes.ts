import { ReactNode } from 'react';
import { ILatLngRadius } from './ILatLngRadius';

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

type UpdateLatitudeAction = {
  type: 'update-latitude';
  payload: number | undefined;
};

type UpdateLongitudeAction = {
  type: 'update-longitude';
  payload: number | undefined;
};

type UpdateLngLatAction = {
  type: 'update-lng-lat';
  payload: ILatLngRadius;
};

type UpdateRadiusAction = {
  type: 'update-radius';
  payload: number | undefined;
};

type UpdatePageAction = {
  type: 'update-page';
  payload: number;
};

type UpdateLimitAction = {
  type: 'update-limit';
  payload: number;
};

export type FiltersActions =
  | UpdateStatusesAction
  | UpdateFromDateUpdateAction
  | UpdateToDateAction
  | UpdateEventIdAction
  | UpdateLatitudeAction
  | UpdateLongitudeAction
  | UpdateLngLatAction
  | UpdateRadiusAction
  | UpdatePageAction
  | UpdateLimitAction;

export type FiltersContextProviderProps = {
  children: ReactNode;
};
