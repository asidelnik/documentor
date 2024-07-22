import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";
import { FiltersProvider } from "../contexts/filters-context";
// import useFetchDataTests from "../server/useFetchDataTests";

export default function RootLayout() {
  // useFetchDataTests();
  // console.log({ data });

  return (
    <>
      <FiltersProvider>
        <RootHeader />
        <Outlet />
      </FiltersProvider>
    </>
  );
}
