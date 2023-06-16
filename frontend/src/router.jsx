import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import ArticleList from "./views/ArticleList";
import UserProfile from "./views/UserProfile";
import UserPreference from "./views/UserPreference";
import NotFound from "./views/NotFound";
import AfterSignup from "./views/AfterSignup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <ArticleList />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/user-preference",
        element: <UserPreference />,
      },
      {
        path: "/after-signup",
        element: <AfterSignup />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
