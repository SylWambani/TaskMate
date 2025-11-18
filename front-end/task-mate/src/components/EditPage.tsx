import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { formatDateTimeInput } from "./styles/DateTime";

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
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: string;
  priority: string;
}

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Task>({
    id: Number(id),
    title: "",
    description: "",
    due_date: "",
    priority: "",
    completed: "",
  });

  // Fetch the task and prefill the form
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/to-do/update-task/${id}/`);
        setForm({
          ...res.data,
          id: res.data.id,
          due_date: formatDateTimeInput(res.data.due_date),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await axiosInstance.patch(`/to-do/update-task/${id}/`, form);

    navigate("/to-do/tasks");
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
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
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
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
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
            value={form.completed}
            onChange={(e) => setForm({ ...form, completed: e.target.value })}
            required
          >
            <option value="">Select Status...</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Edit Task
        </button>
      </form>
    </Box>
  );
};

export default EditPage;
