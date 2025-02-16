import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage Component", () => {
  it("renders the component correctly", () => {
    render(<NotFoundPage />);

    const errorMessage = screen.getByText("Page not found!");
    expect(errorMessage).toBeInTheDocument();
  });
});
