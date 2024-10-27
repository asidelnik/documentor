
export interface IDateTimeRangePickerProps {
  fromDateProp?: Date | null;
  toDateProp?: Date | null;
  updateFromDate: (date: Date | null) => void;
  updateToDate: (date: Date | null) => void;
}
