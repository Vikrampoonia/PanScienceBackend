import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashBoardLayout";

const TaskList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Now dynamic

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Dummy data
    setTasks([
      { id: 1, title: "Prepare Report", status: "Pending", priority: "High", dueDate: "2025-08-15", assignedTo: "John" },
      { id: 2, title: "Update Website", status: "In Progress", priority: "Medium", dueDate: "2025-08-20", assignedTo: "Jane" },
      { id: 3, title: "Client Meeting", status: "Completed", priority: "Low", dueDate: "2025-08-12", assignedTo: "Mark" },
      { id: 4, title: "Database Backup", status: "Pending", priority: "High", dueDate: "2025-08-25", assignedTo: "Paul" },
      { id: 5, title: "Code Review", status: "In Progress", priority: "Medium", dueDate: "2025-08-18", assignedTo: "Sara" },
      { id: 6, title: "UI Design Update", status: "Completed", priority: "Low", dueDate: "2025-08-10", assignedTo: "Anna" },
      { id: 7, title: "Deploy App", status: "Pending", priority: "High", dueDate: "2025-08-30", assignedTo: "Tom" },
    ]);
  }, []);

  // Filter & Search Logic
  const filteredTasks = useMemo(() => {
    return (tasks || []).filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
        task.status.toLowerCase().includes(search.toLowerCase()) ||
        task.priority.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
      const matchesDueDate = dueDateFilter ? task.dueDate === dueDateFilter : true;

      return matchesSearch && matchesStatus && matchesPriority && matchesDueDate;
    });
  }, [tasks, search, statusFilter, priorityFilter, dueDateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
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
          <h1 className="text-xl font-semibold">Tasks</h1>
          <Link
            to="/tasks/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create Task
          </Link>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={dueDateFilter}
            onChange={(e) => setDueDateFilter(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
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
              setStatusFilter("");
              setPriorityFilter("");
              setDueDateFilter("");
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
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Assigned To</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        task.status === "Pending"
                          ? "bg-yellow-500"
                          : task.status === "Completed"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{task.priority}</td>
                  <td className="px-4 py-2">{task.dueDate}</td>
                  <td className="px-4 py-2">{task.assignedTo}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`/tasks/${task.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/tasks/${task.id}/edit`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}

              {paginatedTasks.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No tasks found
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

export default TaskList;
