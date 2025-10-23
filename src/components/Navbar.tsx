const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content shadow-lg px-6">
      {/* Left */}
      <div className="navbar-start">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-white/20 text-white rounded-lg w-10">
              <span className="text-xl">📊</span>
            </div>
          </div>
          <span className="text-xl font-bold hidden lg:inline">OneUp Dashboard</span>
          <span className="text-xl font-bold lg:hidden">OneUp</span>
        </div>
      </div>

      {/* Center (optional) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white/90">
          <li><a>Dashboard</a></li>
          <li><a>Reports</a></li>
          <li><a>Competitions</a></li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-4">
        <button className="btn btn-ghost btn-sm text-white/90">Help</button>
        
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-white/20">
              <span className="flex items-center justify-center h-full font-semibold">DC</span>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><a className="text-neutral">Profile</a></li>
            <li><a className="text-neutral">Settings</a></li>
            <li><a className="text-neutral">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;