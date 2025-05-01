import { Outlet } from "react-router-dom";
import { getCookie } from "../helpers/cookie";

function PrivateRoute() {
  const token = getCookie("id");
  //đáng lẽ là dùng islogin bên layout khỏi cần, nhưng mình sử lý rồi.
  return (
    <>
    {token ? <Outlet/> : ""}
    </>
  )
}
export default PrivateRoute;