import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashBoardLayout";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.newPassword.length < 4)
      newErrors.newPassword = "New password must be at least 4 characters";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Password Changed:", formData);
    navigate("/profile");
  };

  return (
    <DashboardLayout>
        <div className=" flex py-4 justify-center bg-gray-50 px-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Change Password
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
            

            {/* New Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
                </label>
                <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
                />
                {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
                </label>
                <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
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
                onClick={() => navigate("/profile")}
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

export default ChangePassword;
