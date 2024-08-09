import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '0px 5px 0px 0px',
        },
      },
    },
  },
});