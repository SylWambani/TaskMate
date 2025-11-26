import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Text,
} from "@chakra-ui/react";
 import type { Task } from "../TasksPage";

const TaskModal = ({title, description, due_date, completed, priority}:Task) => {
  return (
    <Dialog.Root>
      <DialogTrigger>
        <Text color="blue.500" cursor="pointer">
          Read more
        </Text>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Text>{description}</Text>
        </DialogBody>
        <DialogFooter>
          {due_date} {completed} {priority}
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </Dialog.Root>
  );
};

export default TaskModal;
