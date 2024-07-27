
export interface IDateTimeRangePickerProps {
  fromDate?: Date;
  toDate?: Date;
  updateFromDate: (date: Date) => void;
  updateToDate: (date: Date) => void;
  fetchData: () => void;
}
