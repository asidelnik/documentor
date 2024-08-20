import { IOptionStr } from "../types/IOptionStr";


export interface ICheckBoxesTagsProps {
  options: IOptionStr[];
  checkedId: string | null;
  update: (newId: string | null) => void;
  isDisabled: boolean;
  placeholder: string;
  width: string;
}
