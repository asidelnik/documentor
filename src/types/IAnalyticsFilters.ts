import { EventTypeEnum } from '../constants/event-constants';

export interface IAnalyticsFilters {
  eventTypeId?: EventTypeEnum;
  fromDate?: Date | null;
  toDate?: Date | null;
  lat?: number;
  long?: number;
  radius?: number;
}
