
import PrivateRoute from "./route/private/PrivateRoute";
import PrivateRouting from "./route/private/PrivateRouting";
import PublicRoute from "./route/public/PublicRoute";
import PublicRouting from "./route/public/PublicRouting";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact={true} path="/" element={<PublicRoute />}>
          {PublicRouting.map((PublicRoute, index) => {
            const { path, Component, exact } = PublicRoute;
            return (
              <Route
                key={index}
                path={path}
                element={<Component />}
                exact={`${exact}`}
              />
            );
          })}
        </Route>

        <Route path="/" exact={true} element={<PrivateRoute />}>
          {/* <Route path="/" element={<HomeApp />}> */}
          {PrivateRouting.map((privateRoute, index) => {
            const { path, Component, exact } = privateRoute;
            return (
              <Route
                key={index}
                path={path}
                element={<Component />}
                exact={`${exact}`}
              />
            );
          })}
          {/* </Route> */}
        </Route>

        {/* <Route path="*" element={<ErrPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
