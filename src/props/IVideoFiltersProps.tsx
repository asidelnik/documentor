import { IEventsAutoComplete } from "./IEventsAutoComplete";

export interface IVideoFiltersProps {
  eventsData: IEventsAutoComplete;
  isShowMap: boolean;
  setIsShowMap: (isShow: boolean) => void;
}
