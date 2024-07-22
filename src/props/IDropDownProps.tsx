import { ISelectOption } from '../types/ISelectOption';

export interface IMultipleSelectCheckmarksProps {
  buttonText: string;
  options: ISelectOption[];
  defaultOptions: number[];
  updateSelectedOptions: (selectedOptions: number[]) => void;
}
