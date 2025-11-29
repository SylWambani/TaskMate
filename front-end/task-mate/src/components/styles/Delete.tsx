import { Trash2Icon } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import type { Task } from "../TasksPage";

interface DeleteProps {
  id: number;
  onDelete: (id: number) => void;
}

const Delete = ({ id, onDelete }: DeleteProps) => {
  const [_tasks, setTasks] = useState<Task[]>([]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/to-do/update-task/${id}/`);
      onDelete(id); // 🔥 instantly updates UI
    } catch (error) {
      console.log("Delete error:", error);
    }
  };


  const handleCardDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Trash2Icon onClick={handleDelete} onDelete={handleCardDelete}></Trash2Icon>
  );
};

export default Delete;
