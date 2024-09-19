
import logo from "../../assets/classNetLogowhite.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = null;
  return (
    <div>
      <div className="navbar container mx-auto md:px-10 lg:px-20 w-full h-full gap-6 lg:gap-0  z-[999]">
        <div className="flex-1">
          <a className="">
            <img src={logo} alt="" className="lg:w-3/6 w-full " />
          </a>
        </div>
        <div className="flex-none">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 justify-center">
                <Link
                  to={"/signin"}
                  className="btn border-[3px] bg-transparent text-white border-white font-semibold lg:w-32 rounded-full"
                >
                  Log In
                </Link>
                <Link
                  to={"/signup"}
                  className="btn border-none capitalize bg-accent font-semibold lg:w-32 rounded-full"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
