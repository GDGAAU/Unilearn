import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Courses from './pages/Courses/Courses'; 
import CourseDetails from './components/courses/CourseDetails/CourseDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:id",
    element: <CourseDetails />,
  },
]);

export default router;
