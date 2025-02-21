import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ user, handleLogin, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Task Manager
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white text-lg hover:underline">
            Home
          </Link>
          <Link to="/dashboard" className="text-white text-lg hover:underline">
            Dashboard
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center py-6 gap-4 shadow-md">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
