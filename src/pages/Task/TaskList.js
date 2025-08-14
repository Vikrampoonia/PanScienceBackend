import { useState } from "react";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks] = useState([
    { id: 1, title: "Prepare Report", status: "Pending", priority: "High", dueDate: "2025-08-15", assignedTo: "John" },
    { id: 2, title: "Fix Login Bug", status: "Completed", priority: "Medium", dueDate: "2025-08-12", assignedTo: "Sarah" },
    { id: 3, title: "UI Review", status: "In Progress", priority: "Low", dueDate: "2025-08-16", assignedTo: "Mike" },
  ]);

  return (
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
            {tasks.map(task => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${
                    task.status === "Pending" ? "bg-yellow-500" :
                    task.status === "Completed" ? "bg-green-500" : "bg-blue-500"
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2">{task.priority}</td>
                <td className="px-4 py-2">{task.dueDate}</td>
                <td className="px-4 py-2">{task.assignedTo}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link to={`/tasks/${task.id}`} className="text-blue-600 hover:underline">View</Link>
                  <Link to={`/tasks/${task.id}/edit`} className="text-green-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
