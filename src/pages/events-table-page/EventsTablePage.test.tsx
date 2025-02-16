import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EventsTablePage from "./EventsTablePage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe("EventsTablePage Component", () => {
  it("renders the component correctly", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <EventsTablePage />
      </QueryClientProvider>
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
