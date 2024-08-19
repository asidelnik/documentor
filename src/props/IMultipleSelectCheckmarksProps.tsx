import { IOptionNum } from '../types/IOptionNum';

export interface IMultipleSelectCheckmarksProps {
  buttonText: string;
  options: IOptionNum[];
  defaultOptions: number[];
  width: string;
  updateSelectedOptions: (selectedOptions: number[]) => void;
}
