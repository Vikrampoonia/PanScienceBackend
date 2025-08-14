import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashBoardLayout";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Dummy data for now
    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin",  createdAt: "2025-08-01" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", createdAt: "2025-07-15" },
      { id: 3, name: "Paul Adams", email: "paul@example.com", role: "Manager",  createdAt: "2025-06-22" },
      { id: 4, name: "Sara Lee", email: "sara@example.com", role: "User",  createdAt: "2025-08-05" },
      { id: 5, name: "Tom White", email: "tom@example.com", role: "Admin", createdAt: "2025-07-10" },
      { id: 6, name: "Anna Black", email: "anna@example.com", role: "Manager",  createdAt: "2025-06-28" },
    ]);
  }, []);

  // Filter + Search
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter ? user.role === roleFilter : true;
      

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Users</h1>
          <Link
            to="/users/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create User
          </Link>
        </div>

        {/* Filters */}
       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
  
  {/* Search bar takes 2 columns */}
  <input
    type="text"
    placeholder="Search..."
    className="border p-2 rounded md:col-span-2"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">All Roles</option>
    <option value="Admin">Admin</option>
    <option value="User">User</option>
  </select>

  <select
    value={itemsPerPage}
    onChange={(e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
    className="border p-2 rounded"
  >
    <option value={5}>5 per page</option>
    <option value={10}>10 per page</option>
    <option value={15}>15 per page</option>
    <option value={20}>20 per page</option>
  </select>

  <button
    onClick={() => {
      setSearch("");
      setRoleFilter("");
      setStatusFilter("");
    }}
    className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
  >
    Reset
  </button>
</div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
               
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                 
                  <td className="px-4 py-2">{user.createdAt}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`/users/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 border rounded ${
                  currentPage === idx + 1 ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => changePage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserList;
