const routes = [
  { path: "/login", element: <Login />, public: true },
  { path: "/register", element: <Register />, public: true },
  { path: "/dashboard", element: <DashboardHome />, roles: ["user", "admin"] },
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
