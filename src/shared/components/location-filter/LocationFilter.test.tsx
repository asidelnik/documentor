import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LocationFilter from "./LocationFilter";

describe("LocationFilter Component", () => {
  const props = {
    isShowMap: false,
    lat: 32.0853,
    long: 34.7818,
    radius: 500,
    setIsShowMap: vi.fn(),
    deleteCenterHandler: vi.fn(),
    radiusSliderChange: vi.fn(),
    radiusInputChange: vi.fn(),
    buttonText: "Show Map",
    isVertical: false
  };

  it("renders the component correctly", () => {
    render(<LocationFilter {...props} />);

    const button = screen.getByText("Show Map");
    expect(button).toBeInTheDocument();
  });

  it("calls setIsShowMap when the button is clicked", () => {
    render(<LocationFilter {...props} />);

    const button = screen.getByText("Show Map");
    fireEvent.click(button);
    expect(props.setIsShowMap).toHaveBeenCalled();
  });
});
