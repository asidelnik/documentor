import { IOptionStr } from "../types/IOptionStr";


export interface IComboBoxProps {
  options: IOptionStr[];
  checkedId: string | null;
  update: (newId: string | null) => void;
  isDisabled: boolean;
  placeholder?: string;
  label?: string;
  width: string;
  size: 'small' | 'medium';
}