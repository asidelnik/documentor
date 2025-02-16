import { ReactNode } from 'react';
import { ILatLngRadius } from '../../types/ILatLngRadius';

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

type UpdateEventTypeIdsAction = {
  type: 'update-event-type-ids';
  payload: Array<string> | null;
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

export type EventsFiltersActions =
  | UpdateFromDateUpdateAction
  | UpdateToDateAction
  | UpdatePriorityAction
  | UpdateFreeTextAction
  | UpdateStatusAction
  | UpdateEventTypeIdsAction
  | UpdateLatitudeAction
  | UpdateLongitudeAction
  | UpdateLngLatAction
  | UpdateRadiusAction
  | UpdatePageAction
  | UpdateLimitAction;

export type EventsFiltersContextProviderProps = {
  children: ReactNode;
};
