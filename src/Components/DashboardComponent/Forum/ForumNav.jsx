import React from "react";
import logo from "../../../assets/classNetLogoPrimary.png"
import useUser from "../../../CustomHooks/useUser.jsx";
const ForumNav = () => {

  const { userdb } = useUser();

  return (
    <div>
      <div className="navbar container pt-12 mx-auto">
        <div className="flex-1">
          <a className=""><img src={logo} alt="" className="w-3/5"/></a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end flex items-center gap-3">
            <h1 className="font-bold text-xl text-secondary">{userdb?.name}</h1>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userdb?.profileImage}
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
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumNav;
