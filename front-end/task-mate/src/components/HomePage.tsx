import {
  Box,
  ButtonGroup,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import HeadingStyles from "./styles/HeadingStyles";
import homeImage from "../assets/images/bg-callout.jpg";
import HomeButton from "./styles/HomeButton";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/taskmate-login");
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <Box height="100%" width="100%" overflow="hidden">
      <Image
        src={homeImage}
        alt="Background"
        objectFit="cover"
        w="100%"
        h="100%"
        position="absolute"
      />
      <HeadingStyles />
      <Box
        height="90%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Box
          textAlign="center"
          marginBottom="13%"
          padding={{
            base: "1.8rem",
            sm: "3.1rem",
            md: "2rem",
            lg: "3.5rem",
            xl: "4rem",
          }}
        >
          <Text>
            <Text
              fontSize={{
                base: "1.8rem",
                sm: "3.1rem",
                md: "3.2rem",
                lg: "3.4rem",
                xl: "3.8rem",
                "2xl": "4.2rem",
              }}
              fontWeight="600"
            >
              Welcome to TaskMate!
            </Text>{" "}
            <VStack lineHeight="shorter">
              <Text
                fontSize={{
                  base: "1rem",
                  sm: "2rem",
                  md: "2.1rem",
                  lg: "2.1rem",
                  xl: "2.3rem",
                  "2xl": "2.8rem",
                }}
                fontWeight="400"
                fontStyle="normal"
                marginBottom="0"
              >
                Your personal productivity partner.
              </Text>
              <Text
                fontSize={{
                  base: "1rem",
                  sm: "2rem",
                  md: "2.1rem",
                  lg: "2.1rem",
                  xl: "2.3rem",
                  "2xl": "2.8rem",
                }}
                fontWeight="400"
              >
                Organize, prioritize, and complete your tasks with ease.
              </Text>
            </VStack>
          </Text>
          <ButtonGroup width="100%">
            <HomeButton onclick={handleLogInClick}>LogIn</HomeButton>
            <HomeButton onclick={handleSignUpClick}>SignUp</HomeButton>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
