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
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      { index: true, element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "courses", element: <Courses /> },
      { path: "register", element: <Signup /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default router;