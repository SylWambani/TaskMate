import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const priorities = [
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
];

const statuses = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETE", label: "Complete" },
];

interface Task {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  completed: string;
}

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task>({
    title: "",
    description: "",
    due_date: "",
    priority: "",
    completed: "",
  });

  useEffect(() => {
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTasks({ ...tasks, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/to-do/add-task/", tasks);
      // Redirect after successful submission
      navigate("/to-do/tasks");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={tasks.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Task Description
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={tasks.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="due_date" className="form-label">
            Deadline
          </label>
          <input
            type="datetime-local"
            id="due_date"
            className="form-control"
            value={tasks.due_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            className="form-select"
            id="priority"
            value={tasks.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority...</option>

            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="completed" className="form-label">
            Status
          </label>
          <select
            id="completed"
            className="form-select"
            value={tasks.completed}
            onChange={handleChange}
            required
          >
            <option value="">Select Status...</option>
            {statuses.map((status)=>(<option key={status.value} value={status.value}>{status.label}</option>))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </Box>
  );
};

export default AddTaskPage;
