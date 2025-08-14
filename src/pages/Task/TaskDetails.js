import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText, Calendar, User, Flag, CheckCircle, Download  } from "lucide-react";
import DashboardLayout from "../../layout/DashBoardLayout";


const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch task details by ID (dummy data for now)
    setTask({
      id,
      title: "Prepare Report",
      description:
        "Complete the monthly sales report and review figures before submission.",
      status: "Pending",
      priority: "High",
      dueDate: "2025-08-15",
      assignedTo: "John Doe",
      attachments: ["report1.pdf", "summary.pdf", "dummy.pdf"]
    });
  }, [id]);

  if (!task) return <p>Loading...</p>;

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800"
  };

  const priorityColors = {
    Low: "bg-gray-100 text-gray-800",
    Medium: "bg-purple-100 text-purple-800",
    High: "bg-red-100 text-red-800"
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Task Info Cards */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[task.status]}`}
                >
                  {task.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Flag className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${priorityColors[task.priority]}`}
                >
                  {task.priority}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium text-gray-800">{task.dueDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <User className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Assigned To</p>
                <p className="font-medium text-gray-800">{task.assignedTo}</p>
              </div>
            </div>
          </div>

          {/* Right column - Description + Attachments */}
          <div className="space-y-6 md:col-span-2">
            {/* Description Card */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{task.description}</p>
            </div>

            {/* Attachments Card */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" /> Attachments
              </h2>
              
              {task.attachments.length > 0 ? (
    <ul className="flex flex-wrap gap-3">
      {task.attachments.map((file, idx) => (
        <li
          key={idx}
          className="flex items-center justify-between bg-white px-4 py-2 rounded-lg hover:bg-gray-100 transition w-auto"
        >
            <span className="flex items-center gap-2 mr-2">
              <FileText className="w-4 h-4 text-blue-600" />
              {file}
            </span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition"
              title="Download"
            >
              <Download className="h-5" />
            </a>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 text-sm">No attachments</p>
  )}

            
            </div>
          </div>
        </div>

        {/* Actions */}
        <div  className="flex justify-between">
            <div></div>
            <div className="flex gap-4">
              <Link
                to={`/tasks/${task.id}/edit`}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Task
              </Link>
              <Link
                to="/tasks"
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Tasks
              </Link>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskDetails;
