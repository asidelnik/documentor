import { EventPriority } from '../constants/event-constants';
import { IEventsFilters } from '../types/IEventsFilters';

export const eventsFiltersInitialState: IEventsFilters = {
  fromDate: new Date('2023-10-01T00:00'), // For debugging
  toDate: new Date('2023-10-27T00:00'), // For debugging
  priority: [EventPriority.High, EventPriority.Medium, EventPriority.Low],
  freeText: '',
  page: 1,
  limit: 50,
};

//// Location filtering
// lat: 32.0853,
// lng: 34.7818,
// radius: 10,