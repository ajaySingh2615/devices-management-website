import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut, Sun, Moon } from "lucide-react";

const Navbar = ({ user, onLogout, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-surface-card border-b border-surface-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-base rounded-lg flex items-center justify-center">
                <span className="text-text-invert font-bold text-lg">R</span>
              </div>
              <span className="font-heading font-bold text-xl text-text-base">
                Refurb Tech
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-text-muted hover:text-brand-base px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-text-muted hover:text-brand-base transition-colors duration-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Shopping cart */}
            <button className="p-2 text-text-muted hover:text-brand-base transition-colors duration-200">
              <ShoppingCart size={20} />
            </button>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-text-muted hover:text-brand-base transition-colors duration-200"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">{user.username}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-card border border-surface-border rounded-xl shadow-card py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-text-base hover:bg-brand-subtle hover:bg-opacity-20"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-text-base hover:bg-brand-subtle hover:bg-opacity-20"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <hr className="my-2 border-surface-border" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-status-danger hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth/login" className="btn btn-ghost text-sm">
                  Login
                </Link>
                <Link to="/auth/register" className="btn btn-primary text-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-text-muted hover:text-brand-base"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-surface-card border-t border-surface-border">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 text-text-muted hover:text-brand-base rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <hr className="my-3 border-surface-border" />

            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-text-muted hover:text-brand-base"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button className="p-2 text-text-muted hover:text-brand-base">
                <ShoppingCart size={20} />
              </button>
            </div>

            {user ? (
              <div className="px-3 py-2 space-y-2">
                <div className="flex items-center space-x-2 text-text-base">
                  <User size={20} />
                  <span className="font-medium">{user.username}</span>
                </div>
                <Link
                  to="/profile"
                  className="block py-2 text-text-muted hover:text-brand-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 text-text-muted hover:text-brand-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 text-status-danger"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link
                  to="/auth/login"
                  className="block w-full btn btn-ghost text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="block w-full btn btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
