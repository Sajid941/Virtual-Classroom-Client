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
import DashboardHome from "../pages/DashboardPages/DashboardHome";

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
    element: <AboutPage />,
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
