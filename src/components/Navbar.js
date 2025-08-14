import { FiBell } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
