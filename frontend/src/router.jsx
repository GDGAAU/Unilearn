import { createBrowserRouter, Outlet } from "react-router-dom";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails/ProjectDetails";
import Navbar from "./components/common/Navbar/Navbar"; // Don't forget this!
import Home from "./pages/Home/Home";
import Courses from './pages/Courses/Courses'; 
import CourseDetails from './components/courses/CourseDetails/CourseDetails';
import Signup from "./pages/Register/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"; 

// Create the wrapper so the Navbar shows on all pages
const NavbarWrapper = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />, // This keeps the Navbar visible everywhere
    children: [
      { index: true, element: <Projects /> }, // Default view
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:id", element: <CourseDetails /> },
      { path: "register", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

export default router;