import logos from "../../assets/classNetLogoPrimary.png";
import { TiThMenu } from "react-icons/ti";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useUser from "../../CustomHooks/useUser";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const NavDashboard = ({ handleToggleDrawer }) => {
  const { user, logOut } = useContext(AuthContext);
  const { userdb } = useUser();
  console.log(userdb);
  return (
    <div className="flex justify-center mt-2 ">
      <div className="navbar w-full container  mx-auto bg-base-100 shadow rounded-2xl py-4 fixed  bg-white/10 backdrop-blur-md bg-opacity-15 z-50">
        {/* Logo Section */}
        <div className="container mx-auto">
          <div className="flex-1 flex items-center">
            <button onClick={handleToggleDrawer} className="md:hidden pr-3">
              <TiThMenu size={20} />
            </button>
            <a href="/" aria-label="Home">
              <img src={logos} alt="ClassNet Logo" className="w-28 md:w-52" />
            </a>
          </div>

          {/* User Section */}
          <div className="flex-none gap-2 items-center">
            <div className="dropdown dropdown-end flex items-center gap-3">
              <div className="wrap">
                <h1 className="font-bold text-xl text-secondary hidden md:block">
                  {userdb?.name}
                </h1>
                <span className="text-sm text-gray-600">{userdb?.role}</span>{" "}
                {/* Display user role */}
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://i.postimg.cc/CLkQzVS1/user-1.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box  w-52 p-2 shadow mt-44"
              >
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/forum">Forum</Link>
                </li>
                <li>
                  <a
                    onClick={logOut}
                    className="flex justify-between text-red-500 font-semibold"
                  >
                    Logout
                    <IoIosLogOut size={15} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NavDashboard.propTypes = {
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default NavDashboard;
