import { ReactNode } from 'react';
import { ILatLngRadius } from './ILatLngRadius';

type UpdateFromDateUpdateAction = {
  type: 'update-from-date';
  payload: Date | null;
};

type UpdateToDateAction = {
  type: 'update-to-date';
  payload: Date | null;
};

type UpdateEventTypeIdsAction = {
  type: 'update-event-type-ids';
  payload: Array<string> | null;
};

type UpdateLatitudeAction = {
  type: 'update-latitude';
  payload: number | null;
};

type UpdateLongitudeAction = {
  type: 'update-longitude';
  payload: number | null;
};

type UpdateLngLatAction = {
  type: 'update-lng-lat';
  payload: ILatLngRadius;
};

type UpdateRadiusAction = {
  type: 'update-radius';
  payload: number | null;
};

export type AnalyticsFiltersActions =
  | UpdateFromDateUpdateAction
  | UpdateToDateAction
  | UpdateEventTypeIdsAction
  | UpdateLatitudeAction
  | UpdateLongitudeAction
  | UpdateLngLatAction
  | UpdateRadiusAction;
export type AnalyticsFiltersContextProviderProps = {
  children: ReactNode;
};
