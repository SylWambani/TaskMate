import { Button, ButtonGroup } from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

    return (
      <ButtonGroup width="100%" justifyContent="right">
        <Button
          onClick={() => navigate("/to-do/add-task")}
          backgroundColor="#0f172a"
          fontSize={{'2xl':'1.8rem'}}
        >
          <PlusIcon />
          Add Task
        </Button>
      </ButtonGroup>
    );
};

export default AddTask;
