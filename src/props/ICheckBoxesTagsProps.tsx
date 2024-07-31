import { IEventIdTitle } from "../types/IEventIdTitle";


export interface ICheckBoxesTagsProps {
  options: IEventIdTitle[];
  checkedIdProp: string | null;
  update: (id: string) => void;
}
