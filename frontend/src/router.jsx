import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout"; 
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails/ProjectDetails";
import Courses from './pages/Courses/Courses'; 
import CourseDetails from "./components/courses/CourseDetails/CourseDetails";
import Signup from "./pages/Register/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Projects /> }, 
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:id", element: <CourseDetails /> },
      { path: "instructors", element: <div style={{padding: "20px"}}>Instructors Page Coming Soon...</div> },
      { path: "profile", element: <div style={{padding: "20px"}}>Profile Page Coming Soon...</div> },
    ],
  },
]);

export default router;