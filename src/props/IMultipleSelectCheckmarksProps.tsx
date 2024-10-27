import { FilterParent } from '../enums/FilterParent';
import { IOptionNum } from '../types/IOptionNum';

export interface IMultipleSelectCheckmarksProps {
  buttonText: string;
  options: IOptionNum[];
  defaultOptions: number[];
  width: string;
  parent: FilterParent;
  updateSelectedOptions: (selectedOptions: number[]) => void;
}