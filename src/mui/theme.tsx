import { createTheme } from "@mui/material";

export const MUITheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(226, 100%, 50%)',
      light: 'hsl(226, 100%, 60%)',
    },
    info: {
      main: 'hsl(0, 0%, 30%)',
      dark: 'hsl(0, 0%, 15%)',
    },
    warning: {
      main: 'hsl(0, 100%, 57%)',
      dark: 'hsl(0, 100%, 40%)',
    },
    // secondary: {
    //   main: purple[500],
    // },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: '7px 5px 7px 4px',
          whiteSpace: 'nowrap',
        },
        root: {
          padding: '5px 5px 5px 4px',
        },
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