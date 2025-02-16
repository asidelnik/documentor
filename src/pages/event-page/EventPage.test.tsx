import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EventPage from "./EventPage";

describe("EventPage Component", () => {
  vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useParams: vi.fn().mockReturnValue({ eventId: '123' }),
  }));

  it("renders the component correctly", () => {
    render(<EventPage />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});
