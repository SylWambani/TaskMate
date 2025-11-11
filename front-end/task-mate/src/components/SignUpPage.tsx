import { Box, Button, ButtonGroup, Text, Image } from "@chakra-ui/react";
import { toaster, Toaster } from "./ui/toaster";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import backImage from "../assets/images/bg-masthead.jpg";
import "@fontsource/inter/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import HeadingStyles from "./styles/HeadingStyles";
import FormHeading from "./styles/FormHeading";
import FormButton from "./styles/FormButton";

interface User {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User>({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsers({ ...users, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/users/", users);
      toaster.create({
        title: "Account created successfully!",
        description: "You can now log in with your new account.",
        type: "success",
        duration: 4000,
        closable: true,
      });
      navigate("/taskmate-login");
    } catch (err: any) {
      console.error("Error creating user:", err);
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMessages = Object.entries(errorData)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`
          )
          .join("\n");

        toaster.create({
          title: "Signup failed",
          description: errorMessages,
          type: "error",
          duration: 5000,
          closable: true,
        });
      } else {
        toaster.create({
          title: "Unexpected error",
          description: "Something went wrong. Please try again later.",
          type: "error",
          duration: 4000,
          closable: true,
        });
      }
    }
  };
  const handleLogInClick = () => {
    navigate("/taskmate-login");
  };

  return (
    <Box height="100%" width="100%">
      <Image
        src={backImage}
        alt="Background"
        objectFit="fill"
        w="100%"
        h="100%"
        position="absolute"
      />
      <Toaster />
      <HeadingStyles />
      <Box height="90%" position="relative">
        <FormHeading>SIGNUP</FormHeading>
        <Box height="100%" width="100%">
          <form className="sign-form" onSubmit={handleSubmit}>
            <div className="user-info">
              <div className="mb-3 sign-up">
                <label
                  htmlFor="first_name"
                  className="form-label sign-form-label "
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  className="form-control"
                  type="text"
                  value={users.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 sign-up ">
                <label
                  htmlFor="last_name"
                  className="form-label sign-form-label"
                >
                  Surname
                </label>
                <input
                  id="last_name"
                  className="form-control"
                  type="text"
                  value={users.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 sign-up">
                <label htmlFor="email" className="form-label sign-form-label">
                  Email
                </label>
                <input
                  id="email"
                  className="form-control"
                  placeholder="abc@example.com"
                  type="email"
                  value={users.email}
                  onChange={handleChange}
                  required
                />
                <div className="col-auto">
                  <span id="emailHelpInline" className="form-text">
                    Enter a valid email address
                  </span>
                </div>
              </div>
            </div>
            <div className="user-sign ">
              <div className="mb-3  signup1">
                <label
                  htmlFor="username"
                  className="form-label sign-form-label"
                >
                  User Name
                </label>
                <input
                  id="username"
                  className="form-control"
                  placeholder="e.g. sly254 (no spaces)"
                  type="text"
                  value={users.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3  signup2">
                <label
                  htmlFor="password"
                  className="form-label sign-form-label"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  value={users.password}
                  onChange={handleChange}
                  required
                />
                <div className="col-auto">
                  <span id="passwordHelpInline" className="form-text">
                    Must be 8-20 characters long.
                  </span>
                </div>
              </div>
            </div>

            <ButtonGroup
              width="100%"
              display="block"
              textAlign="center"
              marginTop="2%"
            >
              <FormButton>SignUp</FormButton>
              <Text
                fontSize={{
                  base: "0.9rem",
                  sm: "1.3rem",
                  md: "1.3rem",
                  lg: "1.3rem",
                  xl: "1.5rem",
                  "2xl": "1.8rem",
                }}
              >
                Already have an account?
                <Button
                  variant="plain"
                  onClick={handleLogInClick}
                  textDecoration="underline"
                  border="none"
                  _hover={{ color: "#fff", cursor: "pointer" }}
                >
                  LogIn
                </Button>{" "}
              </Text>
            </ButtonGroup>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
