import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import DashboardLayout from "../../layout/DashBoardLayout";

const Home = () => {
  // Example data (replace with API calls)
  const [stats, setStats] = useState({
    totalTasks: 42,
    pendingTasks: 15,
    completedTasks: 20,
    totalUsers: 8,
    overdueTasks: 3
  });

  const [recentTasks, setRecentTasks] = useState([
    { id: 1, title: "Prepare Report", status: "Pending", dueDate: "2025-08-15", assignedTo: "John" },
    { id: 2, title: "Fix Login Bug", status: "Completed", dueDate: "2025-08-12", assignedTo: "Sarah" },
    { id: 3, title: "UI Review", status: "In Progress", dueDate: "2025-08-16", assignedTo: "Mike" },
  ]);

  const statusData = [
    { name: "Pending", value: stats.pendingTasks },
    { name: "Completed", value: stats.completedTasks },
    { name: "In Progress", value: stats.totalTasks - (stats.pendingTasks + stats.completedTasks) }
  ];

  const priorityData = [
    { name: "Low", value: 10 },
    { name: "Medium", value: 20 },
    { name: "High", value: 12 }
  ];

  const COLORS = ["#fbbf24", "#34d399", "#60a5fa"];

  return (
    <DashboardLayout>
        <div className="space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Tasks" value={stats.totalTasks} color="bg-blue-500" />
            <StatCard title="Pending Tasks" value={stats.pendingTasks} color="bg-yellow-500" />
            <StatCard title="Completed Tasks" value={stats.completedTasks} color="bg-green-500" />
            <StatCard title="Total Users" value={stats.totalUsers} color="bg-purple-500" />
        </div>

        {/* Overdue Alert */}
        {stats.overdueTasks > 0 && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="text-red-700 font-semibold">Overdue Tasks</h4>
            <p className="text-red-600 text-sm">You have {stats.overdueTasks} overdue tasks. Take action!</p>
            </div>
        )}

        {/* Recent Tasks */}
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Due Date</th>
                    <th className="px-4 py-2">Assigned To</th>
                </tr>
                </thead>
                <tbody>
                {recentTasks.map(task => (
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
                    <td className="px-4 py-2">{task.dueDate}</td>
                    <td className="px-4 py-2">{task.assignedTo}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tasks by Status Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Tasks by Status</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>

            {/* Tasks by Priority Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Tasks by Priority</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#60a5fa" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
        </div>
    </DashboardLayout>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-6 rounded-lg shadow text-white ${color}`}>
    <h3 className="text-sm">{title}</h3>
    <p className="mt-2 text-3xl font-bold">{value}</p>
  </div>
);

export default Home;
