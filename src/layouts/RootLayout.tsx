import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";
import useFetchDataTests from "../server/useFetchDataTests";

export default function RootLayout() {
  useFetchDataTests();
  // console.log({ data });

  return (
    <>
      <RootHeader />
      <Outlet />
    </>
  );
}
