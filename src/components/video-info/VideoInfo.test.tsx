import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IVideo } from "../../types/IVideo";
import VideoInfo from "./VideoInfo";
import { dateToStringShortMonthDateYear } from "../../utils/functions";
import { IEventsAutoComplete } from "../../props/IEventsAutoComplete";
import { VideoInfoEnum } from "../../enums/VideoInfoEnum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("VideoInfo Component", () => {
  // Arrange
  const video: IVideo = {
    _id: "1",
    title: "Video 1",
    url: "https://www.youtube.com/embed/SekA57AxJVE",
    thumbnail: "https://img.youtube.com/vi/SekA57AxJVE/0.jpg",
    startTime: "2023-10-24T00:00:00.000Z",
    endTime: "2023-10-24T00:00:07.000Z",
    startTimeDate: new Date("2023-10-24T00:00:00.000Z"),
    endTimeDate: new Date("2023-10-24T00:00:07.000Z"),
    duration: 10,
    orientation: 2,
    eventId: "1",
    status: 1,
    startLocation: { type: "Point", coordinates: [32.0853, 34.7818], heading: 177 },
    endLocation: {
      type: "Point",
      coordinates: [32.0853, 34.7818],
      heading: 177
    }
  };

  const eventsData: IEventsAutoComplete = {
    isFetching: false,
    isPending: false,
    error: null,
    events: [
      { id: "1", label: "Jon Snow" },
      { id: "2", label: "Robb Stark" },
      { id: "3", label: "Daenerys Targaryen" },
      { id: "4", label: "Tyrion Lannister" },
      { id: "5", label: "Arya Stark" }
    ]
  }

  // Act
  it("renders the component correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <VideoInfo
          video={video}
          eventsData={eventsData}
          videoInfoType={VideoInfoEnum.VideosGrid}
          isSelected={true}
          onMouseDown={vi.fn()}
        />
      </QueryClientProvider>
    );

    // Assert
    const videoStartTime = screen.getByText(dateToStringShortMonthDateYear(video.startTimeDate ?? new Date()));
    expect(videoStartTime).toBeInTheDocument();
    const eventInput = document.getElementById('combo-box');
    expect(eventInput).toBeInTheDocument();
  });
});
