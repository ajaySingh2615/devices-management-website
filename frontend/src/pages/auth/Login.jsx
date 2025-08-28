import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/ui/Modal";
import { authService } from "../../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'username'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "info",
    title: "",
    message: "",
    autoClose: false,
  });

  const { updateUser } = useAuth(); // We'll call authService directly and update context manually
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Show registration success message if coming from registration
  useEffect(() => {
    if (location.state?.message) {
      setModalConfig({
        type: "success",
        title: "Registration Complete",
        message: location.state.message,
        autoClose: false,
      });
      setShowModal(true);

      // Clear the message from location state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const credentials = {
        password: formData.password,
        ...(loginMethod === "email"
          ? { email: formData.email }
          : { username: formData.username }),
      };

      const response = await authService.login(credentials);
      // Update the auth context with both user and authenticated state
      updateUser(response.data.user);

      // Show success modal
      setModalConfig({
        type: "success",
        title: "Login Successful!",
        message:
          "Welcome back! You have successfully logged into your account.",
        autoClose: false,
      });
      setShowModal(true);
    } catch (err) {
      setModalConfig({
        type: "error",
        title: "Login Failed",
        message:
          err.message ||
          "Invalid credentials. Please check your email/username and password and try again.",
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canSubmit = () => {
    if (loginMethod === "email") {
      return (
        formData.email &&
        isValidEmail(formData.email) &&
        formData.password.length >= 6
      );
    } else {
      return formData.username && formData.password.length >= 6;
    }
  };

  return (
    <div className="min-h-screen bg-surface-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-brand-base rounded-xl flex items-center justify-center">
              <span className="text-text-invert font-bold text-xl">R</span>
            </div>
            <span className="font-heading font-bold text-2xl text-text-base">
              Refurb Tech
            </span>
          </Link>

          <h1 className="font-heading font-bold text-3xl text-text-base mb-2">
            Welcome back
          </h1>
          <p className="text-text-muted">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="card">
          {/* Login Method Toggle */}
          <div className="flex bg-surface-background rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                loginMethod === "email"
                  ? "bg-surface-card text-brand-base shadow-soft"
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("username")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                loginMethod === "username"
                  ? "bg-surface-card text-brand-base shadow-soft"
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              Username
            </button>
          </div>

          {/* Messages now handled by modal */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Username Field */}
            <div>
              <label
                htmlFor={loginMethod}
                className="block text-sm font-medium text-text-base mb-2"
              >
                {loginMethod === "email" ? "Email Address" : "Username"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {loginMethod === "email" ? (
                    <Mail className="text-text-muted" size={18} />
                  ) : (
                    <span className="text-text-muted font-medium text-lg">
                      @
                    </span>
                  )}
                </div>
                <input
                  type={loginMethod === "email" ? "email" : "text"}
                  id={loginMethod}
                  name={loginMethod}
                  value={formData[loginMethod]}
                  onChange={handleChange}
                  className="input pl-10 w-full"
                  placeholder={
                    loginMethod === "email"
                      ? "Enter your email"
                      : "Enter your username"
                  }
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-base mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-text-muted" size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10 pr-10 w-full"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-base"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-brand-base hover:text-brand-hover transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!canSubmit() || isLoading}
              className={`w-full btn btn-primary ${
                !canSubmit() || isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-text-invert"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface-card text-text-muted">
                  Don't have an account?
                </span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link to="/auth/register" className="btn btn-secondary w-full">
              Create new account
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-text-muted hover:text-brand-base transition-colors"
          >
            ← Back to homepage
          </Link>
        </div>

        {/* Modal for success/error messages */}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            // If it's a success modal, redirect to the intended page
            if (modalConfig.type === "success") {
              navigate(from, { replace: true });
            }
          }}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          autoClose={modalConfig.autoClose}
          autoCloseDelay={1500}
        />
      </div>
    </div>
  );
};

export default Login;
