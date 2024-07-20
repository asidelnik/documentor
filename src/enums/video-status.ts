import { IStyles } from '../types/IStyles';

export enum VideoStatusEnum {
  Unprocessed = 1,
  Usable = 2,
  Restricted = 3,
}

export function getStatusStyles(statusId: number): IStyles {
  switch (statusId) {
    case VideoStatusEnum.Unprocessed:
      return { bg: 'none', boxShadow: 'inset 0 0 0 3px red' };
    case VideoStatusEnum.Usable:
      return { bg: 'green', boxShadow: 'none' };
    case VideoStatusEnum.Restricted:
      return { bg: 'red', boxShadow: 'none' };
    default:
      return { bg: 'gray', boxShadow: 'none' };
  }
}

export const statusTexts: { [key: number]: string } = {
  1: 'Unprocessed',
  2: 'Usable',
  3: 'Restricted',
};
