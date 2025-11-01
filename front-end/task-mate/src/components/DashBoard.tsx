import { Box, Card, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter/400.css";
import dashImage from "../assets/images/portfolio-2.jpg";

const DashBoard = () => {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate("/to-do/tasks");
  };
  const handleAddTasks = () => {
    navigate("/to-do/add-task");
  };

  return (
    <Box
      height="100%"
      bgClip="border-box"
      bgSize="cover"
      bgImage={`url(${dashImage})`}
      bgPos="center"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      overflow="hidden"
    >
      <Box height="10%">
        <Heading as="h1" fontSize="2rem" fontWeight="900" fontStyle="normal" color='white'>
          TASKMATE
        </Heading>
        <Heading as="h5" fontSize="1rem" fontWeight="400" fontStyle="italic" color='white'>
          Where productivity meets simplicity.
        </Heading>
      </Box>
      <Box
        height="90%"
        padding="5%"
        display="flex"
        justifyContent="space-evenly"
      >
        <Card.Root
          width="40%"
          height="100%"
          cursor="pointer"
          bg="rgba(255, 255, 255, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          borderRadius="xl"
          transition="all 0.2s ease-in-out" // smooth hover + press
          _hover={{
            transform: "scale(1.02)", // grows slightly
            boxShadow: "0 4px 30px rgba(0,0,0,0.3)", // adds depth
            backdropFilter: "blur(10px)",
          }}
          _active={{
            transform: "scale(0.95)", // press effect
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
          onClick={handleViewTasks}
          fontSize="4.1rem"
          fontWeight="400"
          textAlign="center"
          justifyContent="center"
        >
          {" "}
          Let’s See What’s Next!
        </Card.Root>
        <Card.Root
          width="40%"
          height="100%"
          cursor="pointer"
          bg="rgba(255, 255, 255, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          borderRadius="xl"
          transition="all 0.2s ease-in-out" // smooth hover + press
          _hover={{
            transform: "scale(1.02)", // grows slightly
            boxShadow: "0 4px 30px rgba(0,0,0,0.3)", // adds depth
            backdropFilter: "blur(10px)",
          }}
          _active={{
            transform: "scale(0.95)", // press effect
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
          onClick={handleAddTasks}
          fontSize="4.1rem"
          fontWeight="400"
          textAlign="center"
          justifyContent="center"
        >
          {" "}
          Got a New Goal?
        </Card.Root>
      </Box>
    </Box>
  );
};

export default DashBoard;
