import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout"; 
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails/ProjectDetails";
import Courses from './pages/Courses/Courses'; 
import CourseDetails from "./components/courses/CourseDetails/CourseDetails";
import Signup from "./pages/Register/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home"; 
import Instructors from "./pages/Instructors/Instructors";
import InstructorDetails from "./components/instructors/InstructorDetails/InstructorDetails";

import Profile from "./pages/profile/profile"; 

import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },


  { path: "instructors", element: <Instructors/>  },
  { path: "instructors/:id", element: <InstructorDetails/>  },


  // Protected main app routes (only visible after login)
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Projects /> }, 
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:id", element: <CourseDetails /> },
      { path: "profile", element: <div style={{ padding: "20px" }}>Profile Page Coming Soon...</div> },
      { path: "instructors", element: <div style={{ padding: "20px" }}>Instructors Page Coming Soon...</div> },
      { path: "profile", element: <Profile /> }, 
    ],
  },
]);

export default router;