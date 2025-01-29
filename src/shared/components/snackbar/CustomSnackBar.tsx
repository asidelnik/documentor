import { Snackbar } from "@mui/material";
import { SnackBarStatusEnum } from "../../../enums/SnackBarStatusEnum";
import { ICustomSnackBarProps } from "../../../types/ICustomSnackBarProps";

export default function CustomSnackBar({ snackBar, closeSnackBar }: ICustomSnackBarProps) {
  return (
    <Snackbar
      open={snackBar.isShow}
      ContentProps={{
        sx: {
          backgroundColor: snackBar.status === SnackBarStatusEnum.Success ? "hsl(115deg 100% 33%)" : "hsl(0deg 98% 40%)",
          border: 'none',
          fontWeight: 'bold',
          color: 'white'
        },
      }}
      message={snackBar.message}
      onClose={closeSnackBar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={5000}
      color={snackBar.status === SnackBarStatusEnum.Success ? 'success' :
        snackBar.status === SnackBarStatusEnum.Failure ? 'failure' : ''} />
  );
}