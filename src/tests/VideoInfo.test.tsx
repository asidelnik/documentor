// import { render, screen } from "@testing-library/react"; // , fireEvent
// import { describe, it, expect, vi } from "vitest";
// import VideoInfo from "../components/video-info/VideoInfo";
// import { IOptionStr } from "../types/IOptionStr";
// import { dateToStringShortMonthDateYear } from "../utils/functions";
// import { IVideo } from "../types/IVideo";

// describe("VideoInfo Component", () => {
//   const video: IVideo = {
//     id: "1",
//     title: "Video 1",
//     url: "https://www.youtube.com/embed/SekA57AxJVE",
//     thumbnail: "https://img.youtube.com/vi/SekA57AxJVE/0.jpg",
//     startTime: "2023-10-24T00:00:00.000Z",
//     endTime: "2023-10-24T00:00:07.000Z",
//     startTimeDate: new Date("2023-10-24T00:00:00.000Z"),
//     endTimeDate: new Date("2023-10-24T00:00:07.000Z"),
//     duration: 10,
//     orientation: 2,
//     eventId: "1",
//     status: 1,
//     startLocation: { type: "Point", coordinates: ["32.0853", "34.7818"], heading: 177 },
//     endLocation: {
//       type: "Point",
//       coordinates: ["32.0853", "34.7818"],
//       heading: 177
//     }
//   };

//   const events: IOptionStr[] = [
//     { id: "1", label: "Jon Snow" },
//     { id: "2", label: "Robb Stark" },
//     { id: "3", label: "Daenerys Targaryen" },
//     { id: "4", label: "Tyrion Lannister" },
//     { id: "5", label: "Arya Stark" }
//   ];

//   // const mockUpdateVideoStatus = vi.fn();
//   // const mockUpdateVideoEvent = vi.fn();
//   const fetchData = vi.fn();

//   it("renders the component correctly", () => {
//     render(
//       <VideoInfo
//         video={video}
//         eventsData={events}
//         fetchData={fetchData}
//       // updateVideoStatus={mockUpdateVideoStatus}
//       // updateVideoEvent={mockUpdateVideoEvent}
//       />
//     );

//     const videoStartTime = screen.getByText(dateToStringShortMonthDateYear(video.startTimeDate ?? new Date()));
//     expect(videoStartTime).toBeInTheDocument();
//     const eventInput = document.getElementById('checkboxes-tags');
//     expect(eventInput).toBeInTheDocument();
//   });
// });


//   // it("opens Google Maps when the map icon is clicked", () => {
//   //   render(
//   //     <VideoInfo
//   //       video={video}
//   //       events={events}
//   //       fetchData={fetchData}
//   //       // updateVideoStatus={mockUpdateVideoStatus}
//   //       // updateVideoEvent={mockUpdateVideoEvent}
//   //     />
//   //   );

//   //   const mapIconButton = screen.getByLabelText("show map");
//   //   fireEvent.click(mapIconButton);

//   //   expect(window.open).toHaveBeenCalledWith(
//   //     "https://www.google.com/maps/search/?api=1&query=32.0853,34.7818",
//   //     "_blank"
//   //   );
//   // });

//   // it("calls updateVideoStatus when a new status is selected", () => {
//   //   render(
//   //     <VideoInfo
//   //       video={video}
//   //       events={events}
//   //       updateVideoStatus={mockUpdateVideoStatus}
//   //       updateVideoEvent={mockUpdateVideoEvent}
//   //     />
//   //   );

//   //   // Assuming PositionedMenu renders a button for each status option
//   //   const statusButton = screen.getByTitle("Status 1");
//   //   fireEvent.click(statusButton);

//   //   expect(mockUpdateVideoStatus).toHaveBeenCalledWith(video.id, 1);
//   // });

//   // it("calls updateVideoEvent when a new event is selected", () => {
//   //   render(
//   //     <VideoInfo
//   //       video={video}
//   //       events={events}
//   //       updateVideoStatus={mockUpdateVideoStatus}
//   //       updateVideoEvent={mockUpdateVideoEvent}
//   //     />
//   //   );

//   //   // Assuming CheckboxesTags renders a checkbox for each event option
//   //   const eventCheckbox = screen.getByLabelText("Jon Snow");
//   //   fireEvent.click(eventCheckbox);

//   //   expect(mockUpdateVideoEvent).toHaveBeenCalledWith(video.id, "1", null);
//   // });
