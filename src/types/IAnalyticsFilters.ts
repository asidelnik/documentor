import { EventType } from 'react-hook-form';

export interface IAnalyticsFilters {
  fromDate?: Date | null;
  toDate?: Date | null;
  type?: EventType;
  lat?: number;
  long?: number;
  radius?: number;
}
