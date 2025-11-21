import { EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface TaskId {
  id: number;
}

const EditButton = ({id}:TaskId) => {
  const navigate = useNavigate();

    const handleUpdate = () => {    
    navigate(`/to-do/update-task/${id}`);
  };

    return <EditIcon onClick={handleUpdate}></EditIcon>;
};

export default EditButton;
