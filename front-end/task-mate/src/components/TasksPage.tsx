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
import EditButton from "./styles/EditButton";
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
      <Box textAlign="center" mt={20}>
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
    <Box height="100%" width="100%" backgroundColor="#0f172a">
      <HeadingStyles color="white" />
      <FormHeading color="white">YOUR TASKS</FormHeading>
      <AddTask/>
      <SimpleGrid
        column={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap={2}
        minChildWidth="sm"
        backgroundColor="#0f172a"
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        flexDirection={{ base: "column", sm: "column", md: "row" }}
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
              <Card.Title>{task.title}</Card.Title>
              <EditButton id={task.id} />
              <Card.Description>{task.description}</Card.Description>
            </Card.Body>
            <Card.Footer>
              <VStack width="100%">
                <Flex width="100%" justifyContent="space-between">
                  <Box display="flex" gap={1}>
                    <Calendar size={16} />
                    <Text fontSize={{ base: "1rem" }}>
                      {formatDate(task.due_date)}{" "}
                    </Text>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Clock />
                    <Text>{formatTime(task.due_date)}</Text>
                  </Box>
                </Flex>
                <Flex
                  width="100%"
                  justifyContent="space-between
                "
                >
                  <Box display="flex" gap={1}>
                    <Hourglass />
                    <Text>{relativeTime(task.due_date)}</Text>
                  </Box>
                  <Box display="flex" gap={1}>
                    <PinIcon />
                    <Text>{task.completed}</Text>
                  </Box>
                </Flex>
                <Flex width="100%" justifyContent="space-between">
                  <Box display="flex" gap={1}>
                    {" "}
                    <Text>{priorityLabel(task.priority)}</Text>
                  </Box>
                  <Box>
                    <Delete id={task.id} />
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
