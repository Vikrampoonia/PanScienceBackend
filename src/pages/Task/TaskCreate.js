import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import DashboardLayout from "../../layout/DashBoardLayout";

const TaskCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
    attachments: [null] // Start with 1 empty field
  });

  const handleFileChange = (index, file) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments[index] = file;
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const addAttachmentField = () => {
    if (formData.attachments.length < 3) {
      setFormData({ ...formData, attachments: [...formData.attachments, null] });
    }
  };

  const removeAttachmentField = (index) => {
    const updatedAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Created:", formData);
    navigate("/tasks");
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Create Task</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Assigned To + Description */}
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="Enter assignee name"
                  className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows={3}
                  className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (Max 3 PDFs)</label>
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-3 mb-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
                  />
                  {file && <span className="text-xs text-gray-600 truncate max-w-[100px]">{file.name}</span>}
                  <button
                    type="button"
                    title="Remove"
                    onClick={() => removeAttachmentField(index)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    <Trash2 className="h-5" />
                  </button>
                </div>
              ))}

              {formData.attachments.length < 3 && (
                <button
                  type="button"
                  onClick={addAttachmentField}
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Add Attachment
                </button>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-between">
            <div></div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default TaskCreate;
