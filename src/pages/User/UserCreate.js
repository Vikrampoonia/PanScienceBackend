import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashBoardLayout";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email.";
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 4) {
      tempErrors.password = "Password must be at least 4 characters.";
    }
    if (!formData.role) tempErrors.role = "Role is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("User Created:", formData);
    navigate("/users");
  };

  return (
    <DashboardLayout>
        <div className="flex  justify-center bg-gray-50 px-4 py-4">
        <div className="bg-white w-full max-w-2xl p-4 rounded-xl shadow-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Create User
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={`border w-full p-2 rounded focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                    }`}
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
                </div>

                {/* Email */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className={`border w-full p-2 rounded focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : ""
                    }`}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
                </div>

                {/* Password */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password (min 4 characters)"
                    className={`border w-full p-2 rounded focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : ""
                    }`}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                </div>

                {/* Role */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                </label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`border w-full p-2 rounded focus:ring-2 focus:ring-blue-500 ${
                    errors.role ? "border-red-500" : ""
                    }`}
                >
                    <option>User</option>
                    <option>Admin</option>
                </select>
                {errors.role && (
                    <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end pt-4">
                <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                Create User
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
    </DashboardLayout>
  );
};

export default CreateUser;
