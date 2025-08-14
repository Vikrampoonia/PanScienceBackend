import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react"; 
import DashboardLayout from "../../layout/DashBoardLayout";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch logged-in user profile from API or use dummy data
    setUser({
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: "2025-08-01",
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <DashboardLayout>  
        <div className=" flex py-4 justify-center bg-gray-50 px-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            My Profile
            </h1>

            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                Full Name
                </label>
                <p className="border p-2 rounded bg-gray-100">{user.name}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <p className="border p-2 rounded bg-gray-100">{user.email}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                Role
                </label>
                <p className="border p-2 rounded bg-gray-100">{user.role}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                Created At
                </label>
                <p className="border p-2 rounded bg-gray-100">{user.createdAt}</p>
            </div>
            </div>

        <div className="flex justify-between mt-6">
    <button
        onClick={() => navigate(-1)} // Go back to previous page
        className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
    >
        <ArrowLeft className="w-4 h-4" />
        Back
    </button>

    <button
        onClick={() => navigate("/profile/change-password")}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
    >
        Change Password
    </button>
    </div>
        </div>
        </div>
      </DashboardLayout>
  );
};

export default Profile;
