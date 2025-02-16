import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AnalyticsPage from "./AnalyticsPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { MUITheme } from '../../mui/theme'; // Adjust the import according to your theme file location

describe("AnalyticsPage Component", () => {
  it("renders the component correctly", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={MUITheme}>
          <MemoryRouter>
            <AnalyticsPage />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });
});
