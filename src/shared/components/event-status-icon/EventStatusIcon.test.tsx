import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EventStatusIcon from "./EventStatusIcon";

describe("EventStatusIcon Component", () => {
  it("renders the component correctly with active status", () => {
    render(<EventStatusIcon status={1} />);

    const icon = screen.getByTitle("Active");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle("background-color: green");
  });

  it("renders the component correctly with inactive status", () => {
    render(<EventStatusIcon status={0} />);

    const icon = screen.getByTitle("Inactive");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle("background-color: hsl(0, 0%, 83%)");
  });
});
