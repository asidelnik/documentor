import { SnackBarStatusEnum } from '../enums/SnackBarStatusEnum';

export interface ICustomSnackBar {
  isShow: boolean;
  status: SnackBarStatusEnum;
  message: string;
}
