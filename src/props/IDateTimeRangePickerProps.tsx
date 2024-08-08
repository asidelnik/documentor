
export interface IDateTimeRangePickerProps {
  fromDateProp?: Date;
  toDateProp?: Date;
  updateFromDate: (date: Date) => void;
  updateToDate: (date: Date) => void;
}
