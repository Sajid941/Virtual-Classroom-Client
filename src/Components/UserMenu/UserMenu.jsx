import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";

const UserMenu = () => {
    const { logOut } = useAuth();
    const { pathname } = useLocation();

    return (
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box  w-52 p-2 shadow mt-44"
        >
            <li hidden={pathname === "/profile"}>
                <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </Link>
            </li>
            <li hidden={pathname === "/"}>
                <a href="/">Home</a>
            </li>
            <li hidden={pathname === "/dashboard/dashboardHome"}>
                <a href="/dashboard/dashboardHome">Dashboard</a>
            </li>
            <li hidden={pathname === "/forum"}>
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
    );
};

export default UserMenu;
