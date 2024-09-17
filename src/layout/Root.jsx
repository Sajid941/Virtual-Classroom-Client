import { Outlet } from "react-router-dom";
import Footer from "../Components/LandingPageComponent/Footer";

const Root = () => {
  return (
    <div>
      <div className="top-5 absolute z-[999999] w-full h-full">
        <Navbar />
      </div>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Root;
