import { FaBrain } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="fixed top-5 w-full flex justify-center z-50">
      <nav className="flex items-center justify-between w-[92%] max-w-6xl px-6 py-3 bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">

        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <FaBrain className="text-blue-400" />
          BurnoutAI
        </Link>

        {isHomePage && (
          <div className="hidden md:flex gap-6 text-slate-300 text-sm">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#grid" className="hover:text-white transition">Gallery</a>
            <a href="#try" className="hover:text-white transition">Test</a>
          </div>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:block text-sm text-slate-300">
                Hi, {user.username}
              </span>

              <Link to="/dashboard">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm transition">
                  Dashboard
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="border border-white/10 hover:border-red-400 text-white px-4 py-2 rounded-xl text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-white/10 hover:border-blue-400 text-white px-4 py-2 rounded-xl text-sm transition">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Navbar;