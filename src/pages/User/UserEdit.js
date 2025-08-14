import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  useEffect(() => {
    // Fetch user by ID or use dummy data
    setFormData({
      name: "John Doe",
      email: "john@example.com",
      password: "****",
      role: "User",
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Role:", formData.role);
    navigate("/users");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Edit User Role
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              disabled
              className="border p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="border p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Password (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              value={formData.password}
              disabled
              className="border p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Role (Editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={formData.role}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
