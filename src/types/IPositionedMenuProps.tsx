import { ReactNode } from "react";
import { VideoStatusEnum } from "../constants/video-status";
import { ISelectOption } from "./ISelectOption";


export interface IPositionedMenuProps {
  options: ISelectOption[];
  videoStatus: VideoStatusEnum;
  select: (option: number) => void;
  children: ReactNode;
}
