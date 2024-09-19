import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../Components/Shared/ErrorPage";
import Forum from "../pages/Forum/Forum";
import DetailedDescussion from "../Components/DashboardComponent/Forum/DetailedDescussion";
import ForumBody from "../Components/DashboardComponent/Forum/ForumBody";
import AboutPage from "../pages/AboutPage/AboutPage";

const router = createBrowserRouter([
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
]);

export default router;
