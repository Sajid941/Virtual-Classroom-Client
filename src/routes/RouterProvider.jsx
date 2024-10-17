import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../Components/Shared/ErrorPage";
import Forum from "../pages/Forum/Forum";
import AboutPage from "../pages/AboutPage/AboutPage";
import SignIn from "../pages/Sign-In/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/Sign-Up/SignUp";
import DashboardBody from "../pages/DashboardPages/DashboardBody";
import DetailedClass from "../pages/DashboardPages/DetailedClass";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/DashboardPages/DashboardHome";
import DetailedDiscussion from "../Components/ForumComponents/DetailedDiscussion";
import AllAssignments from "../pages/DashboardPages/AllAssignments";
import Calendar from "../pages/DashboardPages/Calendar";

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
        element: (
            <PrivateRoute>
                <Forum />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
    },

    {
        path: "/forum/discussion/:slug",
        element: <DetailedDiscussion />,
    },

    // Dashboard Routes
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "dashboardHome",

                element: <DashboardHome />,
            },
            {
                path: "classes",

                element: <DashboardBody />,
            },
            {
                path: "assignments",

                element: <AllAssignments />,
            },
            {
                path: "calendar",
                element: <Calendar />,
            },
        ],
    },
    {
        path: "/class/:id",
        element: (
            <PrivateRoute>
                <DetailedClass />
            </PrivateRoute>
        ),
    },
]);

export default router;
