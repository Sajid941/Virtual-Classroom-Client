import logoBlue from "../../assets/classNetLogoPrimary.png";
import { Link } from "react-router-dom";
import useUser from "../../CustomHooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoIosLogOut } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import PropTypes from 'prop-types'

const ForumNavbar = ({isShowDrawer,setIsShowDrawer}) => {
    const { user, logOut } = useContext(AuthContext);
    const { userDb, isLoading, isError } = useUser();
    return (
        <div>
            <div className="navbar pt-5 mx-auto md:px-10 lg:px-20 w-full gap-6 lg:gap-0 z-30 fixed g-white/10 backdrop-blur-md bg-opacity-15">
                <div className="flex-1">
                    <button onClick={() => setIsShowDrawer(!isShowDrawer)} className="md:hidden pr-3">
                        <TiThMenu size={20} />
                    </button>
                    <a href="/">
                        <img
                            src={
                                logoBlue
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
                                    <img alt="User" src={user?.photoURL ? user.photoURL : "https://i.postimg.cc/CLkQzVS1/user-1.png"} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        {userDb?.newNotifications && <span className="badge">New</span>}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/dashboardHome">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <a onClick={logOut} className="flex justify-between text-red-500 font-semibold">
                                        Logout
                                        <IoIosLogOut size={15} />
                                    </a>

                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 justify-center">
                            <Link
                                to="/signIn"
                                className="btn btn-xs md:btn-md border-[3px] bg-transparent text-accent border-accent hover:bg-accent hover:border-accent hover:text-black font-semibold lg:w-32 rounded-full"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signUp"
                                className="btn btn-xs md:btn-md border-[3px] border-accent capitalize bg-accent hover:bg-transparent hover:border-accent hover:text-accent font-semibold lg:w-32 rounded-full"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {isLoading && <div className=""></div>}
            {isError && <div className="text-center text-red-600">Error fetching user data</div>}
        </div>
    );
};

export default ForumNavbar;

ForumNavbar.propTypes = {
    isShowDrawer: PropTypes.bool.isRequired,
    setIsShowDrawer: PropTypes.func.isRequired,
};