import { ReactNode } from "react";
import { VideoStatusEnum } from "../constants/video-status";
import { IOptionNum } from "./IOptionNum";


export interface IPositionedMenuProps {
  options: IOptionNum[];
  videoStatus: VideoStatusEnum;
  isDisabled: boolean
  select: (option: number) => void;
  children: ReactNode;
}
