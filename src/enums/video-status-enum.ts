import { IStatus } from './IStatus';

export enum VideoStatusEnum {
  Unprocessed = 1,
  Usable = 2,
  Restricted = 3,
}

export const statusMap: { [key: number]: IStatus } = {
  1: { text: 'Unprocessed', color: 'red' },
  2: { text: 'Usable', color: 'green' },
  3: { text: 'Restricted', color: 'orange' },
};
