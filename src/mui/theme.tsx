import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(226, 100%, 50%)',
      light: 'hsl(226, 100%, 60%)',
    },
    // secondary: {
    //   main: purple[500],
    // },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '5px 5px 5px 0px',
        },
        head: {
          padding: '7px 5px 7px 0px',
        }
      },
    },
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: 'primary.main',
    //       color: 'primary.main',
    //       '&:hover': {
    //         backgroundColor: 'primary.main',
    //       },
    //     },
    //   },
    // },
  },
});