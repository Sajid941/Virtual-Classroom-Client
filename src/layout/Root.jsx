import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const Root = () => {
  return (
    <div>
      <div className="top-5 absolute z-[999999] w-full h-full">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
