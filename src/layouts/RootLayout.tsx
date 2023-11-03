import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";
// import useFetchDataTests from "../server/useFetchDataTests";

export default function RootLayout() {
  // const { data } = useFetchDataTests();
  // console.log(data.filteredVideos, data.filteredEvents);

  return (
    <>
      <RootHeader />
      <Outlet />
    </>
  );
}
