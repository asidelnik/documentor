import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";
import { FiltersProvider } from "../contexts/filters-context";

export default function RootLayout() {
  return (
    <>
      <FiltersProvider>
        <RootHeader />
        <Outlet />
      </FiltersProvider>
    </>
  );
}
