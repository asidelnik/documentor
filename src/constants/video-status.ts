import { IStyles } from '../types/IStyles';
import { IOptionNum } from '../types/IOptionNum';

export enum VideoStatusEnum {
  Unprocessed = 1,
  Usable = 2,
  Restricted = 3,
}

export const statusLabels: { [key: number]: string } = {
  1: 'Unprocessed',
  2: 'Usable',
  3: 'Restricted',
};

export const statusAutocompleteOptions: IOptionNum[] = [
  { id: 1, label: 'Unprocessed' },
  { id: 2, label: 'Usable' },
  { id: 3, label: 'Restricted' },
];

export function getStatusStyles(statusId: number): IStyles {
  switch (statusId) {
    case VideoStatusEnum.Unprocessed:
      return { bg: 'transparent', boxShadow: 'inset 0 0 0 3px red' };
    case VideoStatusEnum.Usable:
      return { bg: 'green', boxShadow: 'none' };
    case VideoStatusEnum.Restricted:
      return { bg: 'red', boxShadow: 'none' };
    default:
      return { bg: 'gray', boxShadow: 'none' };
  }
}
