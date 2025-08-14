import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routeConfig";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {routes.map(({ path, element, public: isPublic, roles }) => (
        <Route
          key={path}
          path={path}
          element={isPublic ? element : <PrivateRoute element={element} roles={roles} />}
        />
      ))}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
