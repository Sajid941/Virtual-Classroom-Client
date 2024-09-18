import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import About from "../pages/AboutPage/About";
import ErrorPage from "../Components/Shared/ErrorPage";
import Forum from "../pages/Forum/Forum";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/forum",
                element: <Forum/>
            },
        ]
    },
    {
        path: "/forum",
        element: <Forum />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/forum",
                element: <Forum/>
            },
        ]
    }
])

export default router;