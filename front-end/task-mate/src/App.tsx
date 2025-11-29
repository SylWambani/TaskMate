import { Box} from "@chakra-ui/react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import LogInPage from "./components/LogInPage";
import DashBoard from "./components/DashBoard";
import TasksPage from "./components/TasksPage";
import AddTaskPage from "./components/AddTaskPage";
import SignUpPage from "./components/SignUpPage";
import EditPage from "./components/EditPage";

function App() { 
  return (
      <Box height="100%">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/taskmate-login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/to-do" element={<DashBoard />} />
            <Route path="/to-do/tasks" element={<TasksPage />} />
            <Route path="/to-do/add-task" element={<AddTaskPage />} />
            <Route path="/to-do/update-task/:id"element={<EditPage />} />
          </Routes>
        </HashRouter>
      </Box>
  );
}

export default App;
