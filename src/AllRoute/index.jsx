import { useRoutes } from "react-router-dom";
import { route } from "../Route/index.jsx";

function AllRoutes() {
  const element = useRoutes(route);
  return element;
}

export default AllRoutes;
