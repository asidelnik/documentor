import { IOptionNum } from '../types/IOptionNum';
import { IOptionStr } from '../types/IOptionStr';

export enum EventPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const eventPriorityNumOptions: IOptionNum[] = [
  { id: 3, label: 'High' },
  { id: 2, label: 'Medium' },
  { id: 1, label: 'Low' },
];

export const eventPriorityLabels: { [key: number]: string } = {
  3: 'High',
  2: 'Medium',
  1: 'Low',
};

export enum EventStatus {
  Active = 1,
  Inactive = 2,
}

export const eventStatusNumOptions: IOptionNum[] = [
  { id: 1, label: 'Active' },
  { id: 2, label: 'Inactive' },
];

export const eventStatusLabels: { [key: number]: string } = {
  2: 'Inactive',
  1: 'Active',
};

export const eventTypeNumOptions: IOptionStr[] = [
  { id: '1', label: 'Domestic' },
  { id: '2', label: 'Neighbors' },
  { id: '3', label: 'Gang' },
  { id: '4', label: 'Transportation' },
  { id: '5', label: 'Protests' },
  { id: '6', label: 'Assault' },
  { id: '7', label: 'Bullying' },
];

// export enum EventTypeEnum {
//   Domestic = '1',
//   Neighbors = '2',
//   Gang = '3',
//   Transportation = '4',
//   Protests = '5',
//   Assault = '6',
//   Bullying = '7',
// }
