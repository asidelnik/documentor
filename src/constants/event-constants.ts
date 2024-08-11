import { ISelectOption } from '../types/ISelectOption';

export enum EventPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const eventPriorityAutocompleteOptions: ISelectOption[] = [
  { id: 1, label: 'Low' },
  { id: 2, label: 'Medium' },
  { id: 3, label: 'High' },
];

export const eventPrioirtyLabels: { [key: number]: string } = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
};
