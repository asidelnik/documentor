
export interface IDateTimeRangePickerProps {
  fromDate?: string;
  toDate?: string;
  updateFromDate: (date: string) => void;
  updateToDate: (date: string) => void;
}
