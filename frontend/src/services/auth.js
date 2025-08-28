import api from "./api";
import Cookies from "js-cookie";

// Auth service functions
export const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { user, accessToken, refreshToken } = response.data.data;

      // Store tokens and user data
      Cookies.set("accessToken", accessToken, { expires: 1 }); // 1 day
      Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local storage and cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      const user = response.data.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get user");
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Email verification failed"
      );
    }
  },

  // Resend email verification
  resendEmailVerification: async () => {
    try {
      const response = await api.post("/auth/resend-verification");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to resend verification email"
      );
    }
  },

  // Forgot password request
  forgotPassword: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await api.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Password change failed"
      );
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token =
      Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  // Get stored user data
  getStoredUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      return null;
    }
  },

  // Refresh access token
  refreshToken: async () => {
    try {
      const refreshToken =
        Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/auth/refresh-token", { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      // Update stored tokens
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", newRefreshToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Token refresh failed");
    }
  },
};

export default authService;
