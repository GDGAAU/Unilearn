import { createBrowserRouter } from "react-router-dom";
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
import AdminProfile from "./pages/Admin/AdminProfile/AdminProfile";
import AdminProfileEdit from "./pages/Admin/AdminProfile/AdminProfileEdit"; 

/* Admin Pages */
import AdminDashboard from "./pages/Admin/AdminDashboard/Admin_Dahboard";
import AdminInsights from "./pages/Admin/AdminInsights/AdminInsights";
import AdminInstructors from "./pages/Admin/instructors/AdminInstructors";
import AdminCourses from "./pages/Admin/AdminCourses/AdminCourses";
import AddCourse from "./pages/Admin/AdminCourses/AddCourse";
import AdminAccounts from "./pages/Admin/AdminAccounts/AdminAccounts";

/* DEV MODE (no auth) */
function PrivateRoute({ children }) {
  return children;
}

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

  { path: "instructors", element: <Instructors /> },
  { path: "instructors/:id", element: <InstructorDetails /> },

  {
    path: "/app",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      // Regular routes
      { index: true, element: <Projects /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <ProjectDetails /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:id", element: <CourseDetails /> },
      { path: "instructors", element: <div style={{ padding: "20px" }}>Instructors Page Coming Soon...</div> },
      { path: "profile", element: <Profile /> },

      // Admin routes
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/insights", element: <AdminInsights /> },
      { path: "admin/projects", element: <Projects /> },
      { path: "admin/instructors", element: <AdminInstructors /> },
      {path: "admin/courses", element: <AdminCourses/>},
      {path: "admin/courses/add", element: <AddCourse/>},
      {path : "admin/accounts", element: <AdminAccounts/>},
      {path : "admin/profile", element: <AdminProfile/>},
      {path : "admin/profile/edit", element: <AdminProfileEdit/>},
    ],
  },

  { path: "*", element: <div>Page Not Found</div> },
]);

export default router;