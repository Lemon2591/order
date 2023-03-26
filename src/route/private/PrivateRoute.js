import Home from "../../component/Home";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.accessToken;

  return token ? <Outlet /> : <Navigate to={{ pathname: "/" }} />;
}

export default PrivateRoute;
