import { Outlet } from "react-router-dom";
import Footer from "../Components/LandingPageComponent/Footer";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
  return (
    <div className="bg-white">
      <div className="top-5 absolute z-10 w-full ">
        <Navbar />
      </div>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Root;
