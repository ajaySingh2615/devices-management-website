import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Check,
} from "lucide-react";
// import { useAuth } from "../../context/AuthContext"; // Using authService directly
import Modal from "../../components/ui/Modal";
import { ButtonSpinner } from "../../components/ui/LoadingSpinner";
import { authService } from "../../services/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Using authService directly instead of useAuth to avoid global loading state
  const navigate = useNavigate();

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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setModalConfig({
        type: "error",
        title: "Validation Error",
        message:
          "Passwords do not match. Please make sure both password fields are identical.",
        autoClose: false,
      });
      setShowModal(true);
      return;
    }

    if (formData.password.length < 6) {
      setModalConfig({
        type: "error",
        title: "Password Too Short",
        message:
          "Password must be at least 6 characters long for security purposes.",
        autoClose: false,
      });
      setShowModal(true);
      return;
    }

    if (formData.username.length < 3) {
      setModalConfig({
        type: "error",
        title: "Username Too Short",
        message: "Username must be at least 3 characters long.",
        autoClose: false,
      });
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      await authService.register(userData);

      // Show success modal
      setModalConfig({
        type: "success",
        title: "Registration Successful!",
        message:
          "Your account has been created successfully! We have sent a verification email to your email address. Please check your email and click the verification link before logging in.",
        autoClose: false,
      });
      setShowModal(true);
    } catch (err) {
      setModalConfig({
        type: "error",
        title: "Registration Failed",
        message:
          err.message ||
          "Registration failed. Please try again or contact support if the problem persists.",
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

  const isValidUsername = (username) => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 2) return { text: "Weak", color: "text-red-500" };
    if (strength < 4) return { text: "Fair", color: "text-yellow-500" };
    if (strength < 5) return { text: "Good", color: "text-blue-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const canSubmit = () => {
    return (
      formData.username &&
      isValidUsername(formData.username) &&
      formData.email &&
      isValidEmail(formData.email) &&
      formData.password.length >= 6 &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    );
  };

  const passwordStrengthLevel = passwordStrength(formData.password);
  const passwordStrengthInfo = getPasswordStrengthText(passwordStrengthLevel);

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
            Create your account
          </h1>
          <p className="text-text-muted">
            Join us and start shopping refurbished tech
          </p>
        </div>

        {/* Registration Form */}
        <div className="card animate-in slide-in-from-bottom-8 duration-500 delay-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-text-base mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-text-muted" size={18} />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`input pl-10 w-full ${
                    formData.username && !isValidUsername(formData.username)
                      ? "border-red-300 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="Choose a username"
                  required
                  minLength={3}
                  maxLength={20}
                />
                {formData.username && isValidUsername(formData.username) && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Check className="text-status-success" size={18} />
                  </div>
                )}
              </div>
              <p className="text-xs text-text-muted mt-1">
                3-20 characters, letters, numbers and underscores only
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-base mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-text-muted" size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input pl-10 w-full ${
                    formData.email && !isValidEmail(formData.email)
                      ? "border-red-300 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {formData.email && isValidEmail(formData.email) && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Check className="text-status-success" size={18} />
                  </div>
                )}
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
                  placeholder="Create a password"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Password strength:</span>
                    <span className={passwordStrengthInfo.color}>
                      {passwordStrengthInfo.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        passwordStrengthLevel < 2
                          ? "bg-red-500"
                          : passwordStrengthLevel < 4
                          ? "bg-yellow-500"
                          : passwordStrengthLevel < 5
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${(passwordStrengthLevel / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-text-base mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-text-muted" size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input pl-10 pr-10 w-full ${
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "border-red-300 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-base"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <div className="absolute inset-y-0 right-10 pr-3 flex items-center">
                      <Check className="text-status-success" size={18} />
                    </div>
                  )}
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-status-danger mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Terms and Privacy */}
            <div className="text-xs text-text-muted">
              By creating an account, you agree to our{" "}
              <Link
                to="/terms"
                className="text-brand-base hover:text-brand-hover"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-brand-base hover:text-brand-hover"
              >
                Privacy Policy
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
                  <ButtonSpinner />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create account"
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
                  Already have an account?
                </span>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <Link to="/auth/login" className="btn btn-secondary w-full">
              Sign in instead
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
            // If it's a success modal, redirect to login WITHOUT state message
            if (modalConfig.type === "success") {
              navigate("/auth/login");
            }
          }}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          autoClose={modalConfig.autoClose}
        />
      </div>
    </div>
  );
};

export default Register;
