import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails/ProjectDetails";
import Home from "./pages/Home/Home";
import Courses from './pages/Courses/Courses'; 
import Signup from "./pages/Register/Signup";
import Login from "./pages/Login/Login";

const NavbarWrapper = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },

  
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      { index: true, element: <Projects /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "courses", element: <Courses /> },
      { path: "instructors", element: <div style={{padding: "20px"}}>Instructors Page Coming Soon...</div> },
      { path: "profile", element: <div style={{padding: "20px"}}>Profile Page Coming Soon...</div> },
    ],
  },
]);

export default router;