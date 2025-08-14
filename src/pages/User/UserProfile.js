import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch or set dummy user data
    setUser({
      id,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      password: "****",
    });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          View User
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
              Password
            </label>
            <p className="border p-2 rounded bg-gray-100">{user.password}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <p className="border p-2 rounded bg-gray-100">{user.role}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(`/users/${user.id}/edit`)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
