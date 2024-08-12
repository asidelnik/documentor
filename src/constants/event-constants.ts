import { ISelectOption } from '../types/ISelectOption';

export enum EventPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const eventPriorityAutocompleteOptions: ISelectOption[] = [
  { id: 3, label: 'High' },
  { id: 2, label: 'Medium' },
  { id: 1, label: 'Low' },
];

export const eventPrioirtyLabels: { [key: number]: string } = {
  3: 'High',
  2: 'Medium',
  1: 'Low',
};
