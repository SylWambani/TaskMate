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

  // ERROR STATE
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  // limits
  const maxTitleWords = 10;
  const maxTitleChars = 50; // change this to whatever char limit you want
  const maxDescriptionWords = 30;

  // Fetch the task and prefill the form
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/to-do/update-task/${id}/`);
        let title = res.data.title;

        // Preprocess the title to fit limits
        const words = title.trim().split(/\s+/).filter(Boolean);

        let newTitle = "";
        let totalChars = 0;
        let totalWords = 0;

        for (let word of words) {
          if (totalWords >= maxTitleWords) break;
          if (totalChars + word.length + (newTitle ? 1 : 0) > maxTitleChars)
            break;
          if (newTitle) newTitle += " ";
          newTitle += word;
          totalWords++;
          totalChars = newTitle.length;
        }

        setForm({
          ...res.data,
          id: res.data.id,
          title: newTitle,
          due_date: formatDateTimeInput(res.data.due_date),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Word count using a safe method
    const words = value.trim().split(/\s+/).filter(Boolean);

    if (words.length > maxTitleWords) {
      return; // prevent additional typing beyond limit
    }

    if (value.length > maxTitleChars) {
      return; // prevent typing beyond char limit
    }

    setForm((prev) => ({ ...prev, title: value }));

    setErrors((prev) => ({
      ...prev,
      title:
        words.length === maxTitleWords || value.length === maxTitleChars
          ? `Title limited to ${maxTitleWords} words and ${maxTitleChars} characters.`
          : "",
    }));
  };

  // generic handler for other inputs (description uses word validation but DOESN'T auto-truncate)
  const handleChange =
    (field: keyof Task) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;

      if (field === "description") {
        const wordCount =
          value.trim() === ""
            ? 0
            : value.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > maxDescriptionWords) {
          setErrors((prev) => ({
            ...prev,
            description: `Description cannot exceed ${maxDescriptionWords} words.`,
          }));
        } else {
          setErrors((prev) => ({ ...prev, description: "" }));
        }
      }

      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // final validation: ensure title still within word/char limits
    const titleWords =
      form.title.trim() === ""
        ? 0
        : form.title.trim().split(/\s+/).filter(Boolean).length;
    if (titleWords > maxTitleWords || form.title.length > maxTitleChars) {
      setErrors((prev) => ({
        ...prev,
        title: `Title must be ≤ ${maxTitleWords} words and ≤ ${maxTitleChars} characters.`,
      }));
      return;
    }

    if (errors.title || errors.description) {
      alert("Fix errors before submitting.");
      return;
    }

    await axiosInstance.patch(`/to-do/update-task/${id}/`, form);

    navigate("/to-do/tasks");
  };
  // helper counters
  const titleWordCount =
    form.title.trim() === ""
      ? 0
      : form.title.trim().split(/\s+/).filter(Boolean).length;
  const titleCharCount = form.title.length;

  /*const descriptionWordCount =
    form.description.trim() === ""
      ? 0
      : form.description.trim().split(/\s+/).filter(Boolean).length;*/

  return (
    <Box backgroundColor="#0f172a">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={form.title}
            onChange={handleTitleChange}
            placeholder={`Max ${maxTitleWords} words, ${maxTitleChars} chars`}
            required
          />
          <div className="d-flex justify-content-between mt-1">
            <small className="text-muted">
              {titleWordCount}/{maxTitleWords} words
            </small>
            <small className="text-muted">
              {titleCharCount}/{maxTitleChars} chars
            </small>
          </div>
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Task Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={form.description}
            //onChange={handleChange("description")}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
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
