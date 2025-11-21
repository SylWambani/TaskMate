import { Trash2Icon } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import type { TaskId } from "./EditButton";
import { useState } from "react";
import type { Task } from "../TasksPage";

const Delete = ({ id }: TaskId) => {
    const navigate = useNavigate();
  const [task, setTasks] = useState<Task[]>([]);
    

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/to-do/update-task/${id}/`);
      navigate("/to-do/tasks");
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handleCardDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return <Trash2Icon onClick={handleDelete} onDelete={handleCardDelete}></Trash2Icon>;
};

export default Delete;
