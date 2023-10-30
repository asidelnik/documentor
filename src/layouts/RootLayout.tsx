import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";

export default function RootLayout() {


  return (
    <>
      <RootHeader />
      <Outlet />
    </>
  );
}
