import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import './index.css'
import { ThemeProvider } from '@mui/material';
import { muiTheme } from './components/mui/theme.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query/queryClient.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
