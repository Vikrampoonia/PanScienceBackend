import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiList, FiUsers, FiUser, FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome />, roles: ["user", "admin"] },
    { name: "Tasks", path: "/tasks", icon: <FiList />, roles: ["user", "admin"] },
    { name: "Users", path: "/users", icon: <FiUsers />, roles: ["admin"] },
    { name: "Profile", path: "/profile", icon: <FiUser />, roles: ["user", "admin"] },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={`bg-gray-800 text-white h-screen transition-all duration-300 ${open ? "w-64" : "w-16"} fixed lg:static`}>
      {/* Toggle Button */}
      <div className="flex justify-between items-center p-4">
        <span className={`${!open && "hidden"} text-lg font-bold`}>TaskManager</span>
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Menu Links */}
      <nav className="mt-6 space-y-2">
        {menuItems
          .filter(item => item.roles.includes(user?.role))
          .map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              <span className={`${!open && "hidden"} text-sm`}>{item.name}</span>
            </Link>
          ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 w-full">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-600 transition"
        >
          <FiLogOut />
          <span className={`${!open && "hidden"} text-sm`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
