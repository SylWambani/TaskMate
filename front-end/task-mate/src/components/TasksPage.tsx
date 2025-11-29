import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Button,
  Card,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import HeadingStyles from "./styles/HeadingStyles";
import FormHeading from "./styles/FormHeading";
import { formatDate, formatTime, relativeTime } from "./styles/DateTime";
import { Calendar, Clock, Hourglass, PinIcon } from "lucide-react";
import { priorityLabel } from "./styles/PriorityLabels";
import EditButton, { type TaskId } from "./styles/EditButton";
import Delete from "./styles/Delete";
import AddTask from "./styles/AddTask";

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: string;
  priority: string;
}

const TasksPage = () => {
  const [tasks, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get<Task[]>("/to-do/tasks/");
        setTask(res.data);
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} color="gray.500">
          Loading your tasks...
        </Text>
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box height='100%' textAlign="center" mt={20}>
        <VStack gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            No tasks yet 😴
          </Text>
          <Text color="gray.500">
            You haven’t created any tasks. Want to add one now?
          </Text>
          <Button
            colorScheme="blue"
            onClick={() => navigate("/to-do/add-task")}
          >
            Create a Task
          </Button>
        </VStack>
      </Box>
    );
  }

  const handleUpdate = ({ id }: TaskId) => {
    navigate(`/to-do/update-task/${id}`);
  };

  const handleDeleteTask = (id: number) => {
    setTask((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Box height="100%" width="100%" backgroundColor="#0f172a">
      <HeadingStyles color="white" />
      <FormHeading color="white">YOUR TASKS</FormHeading>
      <AddTask />
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        gap={5}
        backgroundColor="#0f172a"
        width="100%"
        marginTop="3%"
        padding="3%"
      >
        {tasks.map((task) => (
          <Card.Root
            key={task.id}
            bg="rgba(255,255,255,0.08)"
            backdropFilter="blur(10px)"
            color="white"
          >
            <Card.Body>
              <Box margin="0" display="flex" justifyContent="space-between">
                <Card.Title>{task.title}</Card.Title>
                <EditButton id={task.id} />
              </Box>

              <Card.Description color="#e2e8f0">
                {task.description.length > 25
                  ? task.description.slice(0, 25) + "..."
                  : task.description}
              </Card.Description>
              {task.description.length > 25 && (
                <Text
                  color="blue.300"
                  fontSize="sm"
                  margin="0"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => handleUpdate({ id: task.id })}
                >
                  Read more
                </Text>
              )}
            </Card.Body>
            <Card.Footer>
              <VStack width="100%">
                <Flex width="100%" justifyContent="space-between">
                  <Box display="flex" gap={1} alignItems="center">
                    <Calendar size={16} />
                    <Text fontSize={{ base: "1rem" }} marginBottom="0">
                      {formatDate(task.due_date)}{" "}
                    </Text>
                  </Box>
                  <Box display="flex" gap={1} alignItems="center">
                    <Clock size={16} />
                    <Text fontSize={{ base: "1rem" }} marginBottom="0">
                      {formatTime(task.due_date)}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  width="100%"
                  justifyContent="space-between
                "
                >
                  <Box display="flex" gap={1} alignItems="center">
                    <Hourglass size={16} />
                    <Text fontSize={{ base: "1rem" }} marginBottom="0">
                      {relativeTime(task.due_date)}
                    </Text>
                  </Box>
                  <Box display="flex" gap={1} alignItems="center">
                    <PinIcon size={16} />
                    <Text fontSize={{ base: "1rem" }} marginBottom="0">
                      {task.completed}
                    </Text>
                  </Box>
                </Flex>
                <Flex width="100%" justifyContent="space-between">
                  <Box display="flex" gap={1} alignItems="center">
                    <Text fontSize={{ base: "1rem" }} marginBottom="0">
                      {priorityLabel(task.priority)}
                    </Text>
                  </Box>
                  <Box>
                    <Delete id={task.id} onDelete={handleDeleteTask} />
                  </Box>
                </Flex>
              </VStack>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TasksPage;
