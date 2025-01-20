import { EventType } from 'react-hook-form';

export interface IAnalyticsFilters {
  type?: EventType;
  fromDate?: Date | null;
  toDate?: Date | null;
  lat?: number;
  long?: number;
  radius?: number;
}
