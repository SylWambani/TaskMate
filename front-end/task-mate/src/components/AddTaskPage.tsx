import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import FormHeading from "./styles/FormHeading";

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

  // ERROR STATE
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  // limits
  const maxTitleWords = 10;
  const maxTitleChars = 50; // change this to whatever char limit you want
  

  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTasks({ ...tasks, [e.target.id]: e.target.value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

    // word limit check
    if (wordCount > maxTitleWords) {
      setErrors({
        ...errors,
        title: `Title cannot exceed ${maxTitleWords} words`,
      });
      return;
    }

    // char limit check
    if (value.length > maxTitleChars) {
      setErrors({
        ...errors,
        title: `Title cannot exceed ${maxTitleChars} characters`,
      });
      return;
    }

    // valid input → update state and clear errors
    setErrors({ ...errors, title: "" });
    setTasks({ ...tasks, title: value });
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
    <Box
      minHeight="100%"
      width="100%"
      bgColor="#0f172a"
      padding={{
        base: "3%",
        sm: "5%",
        md: "6%",
        lg: "8%",
        xl: "9%",
        "2xl": "10%",
      }}
    >
      <FormHeading color="white">ADD TASK</FormHeading>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label add-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={tasks.title}
            onChange={handleTitleChange}
            required
          />
          {/* ERROR MESSAGE */}
          {errors.title && (
            <Text color="red.300" fontSize="sm" marginTop="1">
              {errors.title}
            </Text>
          )}

          {/* CHARACTER COUNTER */}
          <Text color="gray.400" fontSize="xs" marginTop="1">
            {tasks.title.length}/{maxTitleChars} characters
          </Text>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label add-label">
            Task Description
          </label>
          <textarea
            id="description"
            className="form-control add"
            value={tasks.description}
            onChange={(e) =>
              setTasks({ ...tasks, [e.target.id]: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="due_date" className="form-label add-label">
            Deadline
          </label>
          <input
            type="datetime-local"
            id="due_date"
            className="form-control add"
            value={tasks.due_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label add-label">
            Priority
          </label>
          <select
            className="form-select add"
            id="priority"
            value={tasks.priority}
            onChange={handleChange}
            required
          >
            <option className="add-option" value="">
              Select Priority...
            </option>

            {priorities.map((priority) => (
              <option
                className="add-option-list"
                key={priority.value}
                value={priority.value}
              >
                {priority.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="completed" className="form-label add-label">
            Status
          </label>
          <select
            id="completed"
            className="form-select add"
            value={tasks.completed}
            onChange={handleChange}
            required
          >
            <option className="add-option" value="">
              Select Status...
            </option>
            {statuses.map((status) => (
              <option
                className="add-option-list"
                key={status.value}
                value={status.value}
              >
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="add-btn">
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </Box>
  );
};

export default AddTaskPage;
