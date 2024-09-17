import { Outlet } from "react-router-dom";
import Footer from "../Components/LandingPageComponent/Footer";

const Root = () => {
    return (
        <div>
            <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default Root;