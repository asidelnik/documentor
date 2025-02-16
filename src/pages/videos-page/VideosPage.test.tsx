import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VideosPage from "./VideosPage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

describe("VideosPage Component", () => {
  // Act
  it("renders the component correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <VideosPage />
      </QueryClientProvider>
    );

    // Assert
    const aside = screen.getByRole("complementary");
    expect(aside).toBeInTheDocument();
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });
});
