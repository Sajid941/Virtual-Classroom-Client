import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../Components/Shared/ErrorPage";
import Forum from "../pages/Forum/Forum";
import DetailedDescussion from "../Components/DashboardComponent/Forum/DetailedDescussion";
import ForumBody from "../Components/DashboardComponent/Forum/ForumBody";
import AboutPage from "../pages/AboutPage/AboutPage";
import SignIn from "../pages/Sign-In/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
<<<<<<< HEAD
import SignUp from "../pages/Sign-Up/SignUp";
=======
import DashboardHome from "../pages/DashboardPages/DashboardHome";
>>>>>>> 1d1ea73ae9fc0c442ab6c19db690617e89c60369

const router = createBrowserRouter([

  // Root routes
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/forum",
        element: <Forum />,
      },
      {
        path: "/aboutUs",
        element: <AboutPage />,
      },


    ],
  },

  //authentication
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },

  // Forum Page routes
  {
    path: "/forum",
    element: <Forum />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/forum",
        element: <ForumBody />,
      },
      {
        path: "/forum/discussion/:slug",
        element: <DetailedDescussion />,
      },
    ],
  },


  // Dashboard Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />
      }
    ]
  }
]);

export default router;
