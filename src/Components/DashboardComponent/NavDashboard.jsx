import logos from "../../assets/classNetLogoPrimary.png";
import { TiThMenu } from "react-icons/ti";
import UserMenu from "../UserMenu/UserMenu";
import PropTypes from "prop-types";
import useAuth from "../../CustomHooks/useAuth";
import useUser from "../../CustomHooks/useUser";

const NavDashboard = ({ handleToggleDrawer }) => {
    const { user } = useAuth();
    const { userdb } = useUser();
    return (
        <div className="flex justify-center">
            <div className="navbar pt-5 mx-auto  w-full gap-6 lg:gap-0 fixed backdrop-blur-md bg-opacity-15 z-50">
                {/* Logo Section */}
                <div className="container mx-auto">
                    <div className="flex-1 flex items-center">
                        <button
                            onClick={handleToggleDrawer}
                            className="md:hidden pr-3"
                        >
                            <TiThMenu size={20} />
                        </button>
                        <a href="/" aria-label="Home">
                            <img
                                src={logos}
                                alt="ClassNet Logo"
                                className="w-28 md:w-52"
                            />
                        </a>
                    </div>

                    {/* User Section */}
                    <div className="flex-none gap-2 items-center">
                        <div className="dropdown dropdown-end flex items-center gap-3">
                            <div className="wrap">
                                <h1 className="font-bold text-xl text-secondary md:block">
                                    {userdb?.name}
                                </h1>
                                <span className="text-sm text-gray-600">
                                    {userdb?.role}
                                </span>{" "}
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
                            <UserMenu />
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