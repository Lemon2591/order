import Login from "../../component/Login";
import Register from "../../component/Register";
const PublicRouting = [
  {
    path: "/",
    Component: Login,
    exact: true,
  },
  {
    path: "/register",
    Component: Register,
  },
];

export default PublicRouting;
