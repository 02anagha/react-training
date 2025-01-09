import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Orders from "./components/Orders";
import Profile from "./components/Profile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />
    },
    {
      path: "/home",
      element: <App />,
      
    },
    {
      path: "/profile",
      element: <Profile />,
      
    },
    {
      path: "/orders",
      element: <Orders />,
      
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

export default router