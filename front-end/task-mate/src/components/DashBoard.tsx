import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter/400.css";
import dashImage from "../assets/images/portfolio-2.jpg";
import HeadingStyles from "./styles/HeadingStyles";
import DashBoardCard from "./styles/DashBoardCard";

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
      <HeadingStyles color="white" />
      <Box
        height="90%"
        padding="5%"
        display="flex"
        alignItems='center'
        justifyContent="space-evenly"
        flexDirection={{ base: "column",sm:"row", }}
      >
        <DashBoardCard onclick={handleViewTasks}>
          Let’s See What’s Next!
        </DashBoardCard>
        <DashBoardCard onclick={handleAddTasks}>Got a New Goal?</DashBoardCard>
      </Box>
    </Box>
  );
};

export default DashBoard;
