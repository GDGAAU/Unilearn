import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Courses from './pages/Courses/Courses'; 
import CourseDetails from './components/courses/CourseDetails/CourseDetails';
import Signup from "./pages/Register/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"; 


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
    {
    path: "/Register",
    element: <Signup />,     

  },

  {
    path: "/login",
    element: <Login />,
  },
   {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;