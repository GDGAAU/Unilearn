import { createBrowserRouter } from "react-router-dom";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails/ProjectDetails";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Projects />,
  },
  {
    path: "/projects/:id",
    element: <ProjectDetails />,
  },
 
]);

export default router;