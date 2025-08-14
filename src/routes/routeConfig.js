//Auth pages
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

//dashboard page
import Home from "../pages/DashBoard/Home";

//task page
import TaskCreate from "../pages/Task/TaskCreate";
import TaskDetails from "../pages/Task/TaskDetails";
import TaskEdit from "../pages/Task/TaskEdit";
import TaskList from "../pages/Task/TaskList";


//user page
import UserCreate from "../pages/User/UserCreate";
import UserEdit from "../pages/User/UserEdit";
import UserProfile from "../pages/User/UserProfile";
import UserList from "../pages/User/UserList";

//profile page
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/Profile/ChangePassword";


//NotFound Page
import NotFound from "../pages/NotFound/NotFound";

const routes = [
  { path: "/", element: <Login />, public: true },
  { path: "/register", element: <SignUp />, public: true },
  { path: "/dashboard", element: <Home />, roles: ["user", "admin"] },
  { path: "/tasks", element: <TaskList />, roles: ["user", "admin"] },
  { path: "/tasks/new", element: <TaskCreate />, roles: ["admin"] },
  { path: "/tasks/:id", element: <TaskDetails />, roles: ["user", "admin"] },
  { path: "/tasks/:id/edit", element: <TaskEdit />, roles: ["admin"] },
  { path: "/users", element: <UserList />, roles: ["admin"] },
  { path: "/users/new", element: <UserCreate />, roles: ["admin"] },
  { path: "/users/:id", element: <UserProfile />, roles: ["admin"] },
  { path: "/users/:id/edit", element: <UserEdit />, roles: ["admin"] },
  { path: "/profile", element: <Profile />, roles: ["user", "admin"] },
  { path: "/profile/change-password", element: <ChangePassword />, roles: ["user", "admin"] },
  { path: "*", element: <NotFound />, public: true }
];

export default routes;
