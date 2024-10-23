import logoBlue from "../../assets/classNetLogoPrimary.png";
import useUser from "../../CustomHooks/useUser";
import { TiThMenu } from "react-icons/ti";
import PropTypes from "prop-types";
import UserMenu from "../UserMenu/UserMenu";
import useAuth from "../../CustomHooks/useAuth";

const ForumNavbar = ({ isShowDrawer, setIsShowDrawer }) => {
    const { isLoading, isError } = useUser();
    const { user } = useAuth();
    return (
        <div>
            <div className="navbar pt-5 mx-auto md:px-10 lg:px-20 w-full gap-6 lg:gap-0 z-30 fixed g-white/10 backdrop-blur-md bg-opacity-15">
                <div className="flex-1">
                    <button
                        onClick={() => setIsShowDrawer(!isShowDrawer)}
                        className="md:hidden pr-3"
                    >
                        <TiThMenu size={20} />
                    </button>
                    <a href="/">
                        <img
                            src={logoBlue}
                            alt="logo"
                            className="w-28 md:w-52"
                        />
                    </a>
                </div>
                <div className="flex-none gap-2 items-center">
                    <div className="dropdown dropdown-end flex items-center gap-3">
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
            {isLoading && <div className=""></div>}
            {isError && (
                <div className="text-center text-red-600">
                    Error fetching user data
                </div>
            )}
        </div>
    );
};

export default ForumNavbar;

ForumNavbar.propTypes = {
    isShowDrawer: PropTypes.bool.isRequired,
    setIsShowDrawer: PropTypes.func.isRequired,
};
