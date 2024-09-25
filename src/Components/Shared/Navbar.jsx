import PropTypes from "prop-types";
import logo from "../../assets/classNetLogowhite.png";
import logoBlue from "../../assets/classNetLogoPrimary.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const user = null; // Replace with actual user state

  return (
    <div>
      <div className="navbar pt-5 mx-auto md:px-10 lg:px-20 w-full h-full gap-6 lg:gap-0 z-[999]">
        <div className="flex-1">
          
          <a href="/">
            <img
              src={
                pathname === "/" || pathname === "/aboutUs" ? logo : logoBlue
              }
              alt="logo"
              className="w-28 md:w-52"
            />
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

                    alt="User Avatar"

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

            <div className="flex items-center gap-3 justify-center">
              <Link
                to={"/signIn"}
                className="btn btn-xs md:btn-md border-[3px] bg-transparent text-accent border-accent hover:bg-accent hover:border-accent hover:text-black font-semibold lg:w-32 rounded-full"
              >
                Log In
              </Link>
              <Link
                to={"/signUp"}
                className="btn btn-xs md:btn-md border-[3px] border-accent capitalize bg-accent hover:bg-transparent hover:border-accent hover:text-accent font-semibold lg:w-32 rounded-full"
              >
                Register
              </Link>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};


export default Navbar;