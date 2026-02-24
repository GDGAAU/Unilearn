import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Register/Signup";
import Login from "./pages/Login/Login"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
    {
    path: "/signup",
    element: <Signup />,     
  }
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;