import logos from "../../../assets/classNetLogoPrimary.png";
import { TiThMenu } from "react-icons/ti";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../CustomHooks/useUser";
const NavDashboard = ({ handleToggleDrawer }) => {
  const { user, logOut } = useContext(AuthContext);
  const { userdb } = useUser();
  return (
    <div className="flex justify-center mt-2 ">
      <div className="navbar w-[90%] mx-auto bg-base-100  shadow rounded-2xl py-4 fixed z-50 bg-white/10 backdrop-blur-md bg-opacity-15">
        {/* Logo Section */}
        <div className="container mx-auto">
          <div className="flex-1 flex items-center ">
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
                    src={user?.photoURL} // Assuming user.avatar is the URL to the user's avatar
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-44"
              >
                <li>
                  <a href="/">Home</a>
                </li>
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
                  <a onClick={logOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
NavDashboard.propTypes = {
  handleToggleDrawer: PropTypes.func,
};
