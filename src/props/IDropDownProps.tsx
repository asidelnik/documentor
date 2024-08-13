import { IOptionNum } from '../types/IOptionNum';

export interface IMultipleSelectCheckmarksProps {
  buttonText: string;
  options: IOptionNum[];
  defaultOptions: number[];
  updateSelectedOptions: (selectedOptions: number[]) => void;
}
