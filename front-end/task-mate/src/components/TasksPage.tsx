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

interface Task {
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
      <Box textAlign="center" mt={20} >
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} color="gray.500">
          Loading your tasks...
        </Text>
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box textAlign="center" mt={20} >
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

  return (
    <Box height='100%' width='100%' bg="#0f172a" overflow='hidden'>
      <SimpleGrid
        column={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap={2}
        minChildWidth="sm"
      >
        {tasks.map((task) => (
          <Card.Root
            key={task.id}
            bg="rgba(255,255,255,0.08)"
            backdropFilter="blur(10px)"
            color="white"
            width='fit-content'
          >
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Description>{task.description}</Card.Description>
            </Card.Body>
            <Card.Footer>
              {task.due_date} {task.completed} {task.priority}
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TasksPage;
