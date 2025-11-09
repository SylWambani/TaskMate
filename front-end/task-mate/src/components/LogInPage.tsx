import { Box, Button, ButtonGroup, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logInImage from "../assets/images/portfolio-1.jpg";
import HeadingStyles from "./styles/HeadingStyles";
import FormHeading from "./styles/FormHeading";
import FormButton from "./styles/FormButton";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    e.preventDefault(); 

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      console.log("Login success:", data);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

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
    <Box height="100%" width="100%" overflow="hidden">
      <Image
        src={logInImage}
        alt="Background"
        objectFit="cover"
        w="100%"
        h="100%"
        position="absolute"
      />
      <HeadingStyles />
      <Box
        width="100%"
        padding="5% 5% 0 5%"
        height="90%"
        justifySelf="center"
        position="relative"
      >
        <FormHeading> LOGIN</FormHeading>

        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="user-name" className="form-label">
              Username
            </label>
            <input
              id="user-name"
              type="text"
              className="form-control "
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
              className="form-control "
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
            height="60%"
            display="block"
            textAlign="center"
          >
            <FormButton>LogIn</FormButton>
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
