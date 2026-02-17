import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Register/Signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
    {
    path: "/signup",
    element: <Signup />,     
  }
]);

export default router;
