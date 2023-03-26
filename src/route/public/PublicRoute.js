import { Navigate, Outlet } from "react-router-dom";
import Login from "../../component/Login";

function PublicRoute() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.accessToken;

  return !token ? <Outlet /> : <Navigate to={{ pathname: "/home" }} />;
}

export default PublicRoute;
