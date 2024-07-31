import { IEventIdTitle } from "../types/IEventIdTitle";


export interface ICheckBoxesTagsProps {
  options: IEventIdTitle[];
  checkedId: string | null;
  update: (newId: string | null, oldId: string | null) => void;
}
