import logos from "../../../assets/classNetLogoPrimary.png";

const NavDashboard = () => {
    const user = {
        name: "John Doe",
        role: "Teacher", // Dynamic role
        avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      };
  return (
    <div className="navbar mx-auto bg-base-100 shadow-md rounded-2xl w-full py-4 fixed z-50">
      {/* Logo Section */}
      <div className="container mx-auto">

      <div className="flex-1">
        <a href="/" aria-label="Home">
          <img src={logos} alt="ClassNet Logo" className="w-28 md:w-52" />
        </a>
      </div>

      {/* User Section */}
      <div className="flex-none gap-2 items-center">
        <div className="dropdown dropdown-end flex items-center gap-3">
          <div className="wrap">
          <h1 className="font-bold text-xl text-secondary hidden md:block">{user.name}</h1>
          <span className="text-sm text-gray-600">{user.role}</span> {/* Display user role */}
          </div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={user.avatar} // Assuming user.avatar is the URL to the user's avatar
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

export default NavDashboard;
