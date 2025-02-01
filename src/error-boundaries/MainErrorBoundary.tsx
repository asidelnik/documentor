import { useRouteError } from "react-router-dom";
import c from "./MainErrorBoundary.module.scss";

export default function MainErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className={c.container}>
      Error page!
    </div>
  );
}