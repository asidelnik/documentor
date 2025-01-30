import { ICustomSnackBar } from './ICustomSnackBar';

export interface ICustomSnackBarProps {
  snackBar: ICustomSnackBar;
  closeSnackBar: () => void;
}
