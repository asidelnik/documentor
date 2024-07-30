import { IEventIdTitle } from "../types/IEventIdTitle";


export interface ICheckBoxesTagsProps {
  options: IEventIdTitle[];
  checkedId: string | null;
  update: (id: string) => void;
}
