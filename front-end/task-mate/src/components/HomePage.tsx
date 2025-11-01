import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import homeImage from "../assets/images/bg-callout.jpg";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import HeadingStyles from "./styles/headingStyles";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/taskmate-login");
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <Box
      height="100%"
      bgClip="border-box"
      bgSize="cover"
      bgImage={`url(${homeImage})`}
    >
      <HeadingStyles/>
      <Box
        height="90%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center" marginBottom="13%">
          <Text>
            <Text fontSize="3.5rem" fontWeight="600">
              Welcome to TaskMate!
            </Text>{" "}
            <VStack lineHeight="shorter">
              <Text
                fontSize="1.8rem"
                fontWeight="400"
                fontStyle="normal"
                marginBottom="0"
              >
                Your personal productivity partner.
              </Text>
              <Text fontSize="1.6rem" fontWeight="400">
                Organize, prioritize, and complete your tasks with ease.
              </Text>
            </VStack>
          </Text>
          <ButtonGroup width="100%">
            <Button
              onClick={handleLogInClick}
              width="50%"
              height="50px"
              borderRadius="15px"
              border="none"
              _hover={{ backgroundColor: "#333", cursor: "pointer" }}
            >
              Login
            </Button>
            <Button
              onClick={handleSignUpClick}
              width="50%"
              height="50px"
              borderRadius="15px"
              border="none"
              _hover={{ backgroundColor: "#333", cursor: "pointer" }}
            >
              SignUp
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
