import { IOptionStr } from "../types/IOptionStr";


export interface ITagsProps {
  options: IOptionStr[];
  checkedIds: Array<string> | null;
  update: (ids: Array<string> | null) => void;
  isDisabled: boolean;
  placeholder?: string;
  label?: string;
  width: string;
  size: 'small' | 'medium';
}
