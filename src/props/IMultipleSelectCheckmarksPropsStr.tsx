import { FilterParent } from '../enums/FilterParent';
import { IOptionStr } from '../types/IOptionStr';


export interface IMultipleSelectCheckmarksPropsStr {
  options: Array<IOptionStr>;
  defaultOptions: Array<string>;
  updateSelectedOptions: (ids: Array<string>) => void;
  buttonText: string;
  width: string;
  parent: FilterParent;
}
