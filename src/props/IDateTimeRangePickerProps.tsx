import { FilterParent } from "../enums/FilterParent";

export interface IDateTimeRangePickerProps {
  fromDateProp?: Date | null;
  toDateProp?: Date | null;
  parent: FilterParent;
  updateFromDate: (date: Date | null) => void;
  updateToDate: (date: Date | null) => void;
}

export interface IDatePickerProps {
  fromDateProp?: Date | null;
  toDateProp?: Date | null;
  updateFromDate: (date: Date | null) => void;
  updateToDate: (date: Date | null) => void;
}