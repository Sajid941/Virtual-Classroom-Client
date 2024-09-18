import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import About from "../pages/AboutPage/About";
import ErrorPage from "../Components/Shared/ErrorPage";

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
                path: "about",
                element: <About></About>
            },
        ]
    }
])

export default router;