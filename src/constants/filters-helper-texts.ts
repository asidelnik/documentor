import { DateTimeValidationError } from '@mui/x-date-pickers/models';

export function filtersHelperTexts(
  error: DateTimeValidationError | string | null
): string {
  switch (error) {
    case 'maxDate':
      return 'Later than "To date field". Or future date.';
    case 'disableFuture':
      return 'Future date not allowed.';
    case 'invalidDate':
      return 'Please select a valid date';
    default:
      return '';
  }
}

// export enum RangeDatePickerField {
//   FromDate = 1,
//   ToDate = 2,
// }
