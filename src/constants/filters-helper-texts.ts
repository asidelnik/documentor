import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import { DatePickerParent } from '../enums/DatePickerParent';

export function filtersHelperTexts(
  error: DateTimeValidationError | null,
  datePickerParent: DatePickerParent
): string {
  switch (error) {
    case 'maxDate':
      return 'Later than "To date field". Or future date.';
    case 'disableFuture':
      return 'Future date not allowed.';
    case 'invalidDate':
      return 'Please select a valid date';
    case null:
      return datePickerParent === DatePickerParent.Form
        ? 'Start time is required'
        : '';
    default:
      return '';
  }
}