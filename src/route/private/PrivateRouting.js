import Home from "../../component/Home";
import Admin from "../../component/Admin";
const PrivateRouting = [
  {
    path: "/home",
    Component: Home,
    exact: true,
  },
  {
    path: "/admin",
    Component: Admin,
  },
];

export default PrivateRouting;
