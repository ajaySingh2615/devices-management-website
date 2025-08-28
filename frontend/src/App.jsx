import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ui/ProtectedRoute";

// Static Pages
import Home from "./pages/static/Home";
import About from "./pages/static/About";
import Contact from "./pages/static/Contact";
import Products from "./pages/static/Products";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";

// Hook for auth state
import { useAuth } from "./context/AuthContext";

// App content component that has access to auth context
const AppContent = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public routes with layout */}
        <Route
          path="/"
          element={
            <Layout user={user} onLogout={logout}>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout user={user} onLogout={logout}>
              <About />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout user={user} onLogout={logout}>
              <Contact />
            </Layout>
          }
        />

        <Route
          path="/products"
          element={
            <Layout user={user} onLogout={logout}>
              <Products />
            </Layout>
          }
        />

        {/* Auth routes - no layout, redirect if already authenticated */}
        <Route
          path="/auth/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auth/register"
          element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          }
        />

        {/* Email verification - accessible to all */}
        <Route
          path="/auth/verify-email/:token?"
          element={<EmailVerification />}
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout user={user} onLogout={logout}>
                <div className="min-h-screen bg-surface-background flex items-center justify-center">
                  <div className="card text-center">
                    <h1 className="font-heading font-bold text-2xl text-text-base mb-4">
                      Profile Page
                    </h1>
                    <p className="text-text-muted mb-4">
                      Welcome, {user?.username}!
                    </p>
                    <p className="text-text-muted">
                      Profile management coming soon...
                    </p>
                  </div>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout user={user} onLogout={logout}>
                <div className="min-h-screen bg-surface-background flex items-center justify-center">
                  <div className="card text-center">
                    <h1 className="font-heading font-bold text-2xl text-text-base mb-4">
                      Order History
                    </h1>
                    <p className="text-text-muted">
                      Order management coming soon...
                    </p>
                  </div>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <Layout user={user} onLogout={logout}>
              <div className="min-h-screen bg-surface-background flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🔍</div>
                  <h1 className="font-heading font-bold text-4xl text-text-base mb-4">
                    Page Not Found
                  </h1>
                  <p className="text-text-muted mb-8">
                    The page you're looking for doesn't exist.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Go Home
                  </a>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

// Main App component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
