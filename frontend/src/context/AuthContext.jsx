import { createContext, useContext, useReducer, useEffect } from "react";
import { authService } from "../services/auth";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const ActionTypes = {
  AUTH_REQUEST: "AUTH_REQUEST",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAILURE: "AUTH_FAILURE",
  LOGOUT: "LOGOUT",
  CLEAR_ERROR: "CLEAR_ERROR",
  UPDATE_USER: "UPDATE_USER",
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case ActionTypes.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: ActionTypes.AUTH_REQUEST });

      try {
        // Check if user is authenticated
        if (authService.isAuthenticated()) {
          // Try to get current user from server
          const user = await authService.getCurrentUser();
          dispatch({
            type: ActionTypes.AUTH_SUCCESS,
            payload: { user },
          });
        } else {
          // Check for stored user data
          const storedUser = authService.getStoredUser();
          if (storedUser) {
            dispatch({
              type: ActionTypes.AUTH_SUCCESS,
              payload: { user: storedUser },
            });
          } else {
            dispatch({
              type: ActionTypes.AUTH_FAILURE,
              payload: { error: null },
            });
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // If getting current user fails, try using stored user data
        const storedUser = authService.getStoredUser();
        if (storedUser) {
          dispatch({
            type: ActionTypes.AUTH_SUCCESS,
            payload: { user: storedUser },
          });
        } else {
          dispatch({
            type: ActionTypes.AUTH_FAILURE,
            payload: { error: error.message },
          });
        }
      }
    };

    initializeAuth();
  }, []);

  // Auth actions
  const login = async (credentials) => {
    dispatch({ type: ActionTypes.AUTH_REQUEST });

    try {
      const response = await authService.login(credentials);
      const user = response.data.user;

      dispatch({
        type: ActionTypes.AUTH_SUCCESS,
        payload: { user },
      });

      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: ActionTypes.AUTH_REQUEST });

    try {
      const response = await authService.register(userData);

      // Note: After registration, user needs to verify email
      // So we don't automatically log them in
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: null },
      });

      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch({ type: ActionTypes.LOGOUT });
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await authService.verifyEmail(token);
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  const resendEmailVerification = async () => {
    try {
      const response = await authService.resendEmailVerification();
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await authService.resetPassword(token, newPassword);
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await authService.changePassword(
        oldPassword,
        newPassword
      );
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.AUTH_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  const updateUser = (user) => {
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: { user },
    });
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Context value
  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    login,
    register,
    logout,
    verifyEmail,
    resendEmailVerification,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
