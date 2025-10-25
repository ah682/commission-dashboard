import logo from '../../assets/logo.svg';

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content shadow-lg px-6">
      {/* Left */}
      <div className="navbar-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 items-center justify-center">
           <img
           src={logo}
           alt="OneUp Logo"
           className="w-full h-full object-contain"></img>
          </div>
         {/* Dashboard Button with Border and Dropdown */}
          <div className="dropdown dropdown-bottom">
            <label
              tabIndex={0}
              className="btn btn-sm bg-white/20 border-2 border-white text-white hover:bg-white/30 normal-case gap-2 font-bold text-base"
            >
              Dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
            >
              <li><a className="text-neutral font-semibold">Main Dashboard</a></li>
              <li><a className="text-neutral font-semibold">Analytics</a></li>
              <li><a className="text-neutral font-semibold">Performance</a></li>
            </ul>
          </div>
          
          {/* Horizontal menu items with dropdowns */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Reports Dropdown */}
            <div className="dropdown dropdown-bottom">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm text-white font-bold hover:bg-white/10 normal-case gap-1 text-base"
              >
                Reports
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                <li><a className="text-neutral font-semibold">Sales Report</a></li>
                <li><a className="text-neutral font-semibold">Monthly Report</a></li>
                <li><a className="text-neutral font-semibold">Annual Report</a></li>
              </ul>
            </div>

            {/* Competitions Dropdown */}
            <div className="dropdown dropdown-bottom">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm text-white font-bold hover:bg-white/10 normal-case gap-1 text-base"
              >
                Competitions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                <li><a className="text-neutral font-semibold">Active Competitions</a></li>
                <li><a className="text-neutral font-semibold">Upcoming</a></li>
                <li><a className="text-neutral font-semibold">Past Results</a></li>
              </ul>
            </div>

            {/* TV Dropdown */}
            <div className="dropdown dropdown-bottom">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm text-white font-bold hover:bg-white/10 normal-case gap-1 text-base"
              >
                TV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                <li><a className="text-neutral font-semibold">Live View</a></li>
                <li><a className="text-neutral font-semibold">Display Settings</a></li>
                <li><a className="text-neutral font-semibold">TV Management</a></li>
              </ul>
            </div>

            {/* Manage Dropdown */}
            <div className="dropdown dropdown-bottom">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm text-white font-bold hover:bg-white/10 normal-case gap-1 text-base"
              >
                Manage
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                <li><a className="text-neutral font-semibold">Users</a></li>
                <li><a className="text-neutral font-semibold">Teams</a></li>
                <li><a className="text-neutral font-semibold">Settings</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Center (optional) */}
      <div className="navbar-center hidden lg:flex">
      </div>
      
      {/* Right */}
      <div className="navbar-end gap-4">
        <button className="btn btn-ghost btn-sm text-white/90 font-bold text-base">Help</button>
       
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-white/20">
              <span className="flex items-center justify-center h-full font-bold">DC</span>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><a className="text-neutral font-semibold">Profile</a></li>
            <li><a className="text-neutral font-semibold">Settings</a></li>
            <li><a className="text-neutral font-semibold">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;