import { Box, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logInImage from "../assets/images/portfolio-1.jpg";
import "@fontsource/inter/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import HeadingStyles from "./styles/HeadingStyles";
import FormHeading from "./styles/FormHeading";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Optional: just to test if backend is running
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    fetch("http://127.0.0.1:8000/to-do/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page refresh

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      console.log("Login success:", data);

      // Save the JWT tokens to localStorage
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Redirect after login
      navigate("/to-do");
    } catch (error) {
      alert("Invalid credentials or server error");
      console.error(error);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Box
      height="100%"
      bgClip="border-box"
      bgSize="cover"
      bgImage={`url(${logInImage})`}
    >
      <HeadingStyles />
      <Box width="50%" height="90%" justifySelf="center">
        <FormHeading> LOGIN</FormHeading>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user-name" className="form-label">
              Username
            </label>
            <input
              id="user-name"
              type="text"
              className="form-control form-control-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="col-auto">
              <span id="passwordHelpInline" className="form-text">
                Must be 8-20 characters long.
              </span>
            </div>
          </div>
          <ButtonGroup
            width="100%"
            display="block"
            textAlign="center"
            marginTop="5%"
          >
            <Button
              type="submit"
              size="xl"
              width="50%"
              borderRadius="5px"
              border="none"
              _hover={{ backgroundColor: "#333", cursor: "pointer" }}
            >
              Login
            </Button>
            <Text>
              Don't have an account?
              <Button
                variant="plain"
                onClick={handleSignUpClick}
                textDecoration="underline"
                border="none"
                _hover={{ color: "#fff", cursor: "pointer" }}
              >
                SignUp
              </Button>{" "}
            </Text>
          </ButtonGroup>
        </form>
      </Box>
    </Box>
  );
};

export default LogInPage;
