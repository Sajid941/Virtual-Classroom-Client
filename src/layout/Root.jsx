import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
  return (
    <div>
      <div className="top-5 absolute z-[999999] w-full h-full">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
