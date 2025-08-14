import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
    attachments: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setFormData({ ...formData, attachments: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Created:", formData);
    navigate("/tasks");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Create Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} className="border w-full p-2 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border w-full p-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="border w-full p-2 rounded">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select name="priority" value={formData.priority} onChange={handleChange} className="border w-full p-2 rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="border w-full p-2 rounded" />
        <input name="assignedTo" placeholder="Assign To (User ID or Name)" value={formData.assignedTo} onChange={handleChange} className="border w-full p-2 rounded" />
        <input type="file" name="attachments" multiple onChange={handleChange} className="border w-full p-2 rounded" accept=".pdf" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default TaskCreate;
