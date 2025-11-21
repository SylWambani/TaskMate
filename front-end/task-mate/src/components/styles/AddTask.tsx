import { Button } from "@chakra-ui/react";
import { Box, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

    return (
      
        <Button
          onClick={() => navigate("/to-do/add-task")}
          backgroundColor="#0f172a"
        >
          <PlusIcon />
          Add Task
        </Button>
    );
};

export default AddTask;
