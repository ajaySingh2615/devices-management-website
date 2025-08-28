import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import { CheckCircle, AlertCircle, Mail, RotateCcw } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { PageSpinner, ButtonSpinner } from "../../components/ui/LoadingSpinner";
import { authService } from "../../services/auth";

const EmailVerification = () => {
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const { verifyEmail, resendEmailVerification, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for URL parameters from backend redirect
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    // Debug logging
    console.log("EmailVerification - Debug Info:", {
      success,
      error,
      allParams: Object.fromEntries(searchParams.entries()),
      currentURL: window.location.href,
      searchParamsString: searchParams.toString(),
      token,
      hasToken: !!token,
      currentStatus: status,
    });

    // Remove debug alert after testing

    if (success === "true") {
      setStatus("success");
      setMessage(
        "Email verified successfully! You can now log in to your account."
      );
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/auth/login", {
          state: { message: "Email verified successfully! Please log in." },
        });
      }, 3000);
      return;
    }

    if (error) {
      const email = searchParams.get("email");

      switch (error) {
        case "missing-token":
          setStatus("error");
          setMessage(
            "Email verification token is missing. Please click the verification link in your email again."
          );
          break;
        case "invalid-token":
          setStatus("error");
          setMessage(
            "This verification link is invalid or has been used already. Please request a new verification email."
          );
          break;
        case "already-verified":
          setStatus("success");
          setMessage(
            "Great news! Your email is already verified. You can now log in to your account."
          );
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate("/auth/login", {
              state: {
                message: "Your email is already verified. Please log in.",
              },
            });
          }, 2000);
          break;
        case "token-expired":
          setStatus("error");
          setMessage(
            `Your verification link has expired. ${
              email
                ? `We can send a new verification email to ${email}.`
                : "Please request a new verification email."
            }`
          );
          break;
        case "verification-failed":
          setStatus("error");
          setMessage(
            "Email verification failed due to a technical issue. Please try again or contact support."
          );
          break;
        default:
          setStatus("error");
          setMessage("Email verification failed. Please try again.");
      }
      return;
    }

    // If we have a token but no URL params, handle verification via API (for direct frontend access)
    if (token) {
      handleVerification();
    }
  }, [token, searchParams]);

  const handleVerification = async () => {
    try {
      setStatus("verifying");
      await verifyEmail(token);
      setStatus("success");
      setMessage(
        "Email verified successfully! You can now log in to your account."
      );

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/auth/login", {
          state: { message: "Email verified successfully! Please log in." },
        });
      }, 3000);
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "Email verification failed. The link may be expired or invalid."
      );
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      setResendSuccess(false);
      await resendEmailVerification();
      setResendSuccess(true);
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error) {
      setMessage(error.message || "Failed to resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  const handleResendVerificationPublic = async (email) => {
    try {
      setIsResending(true);
      setResendSuccess(false);
      await authService.resendEmailVerificationPublic(email);
      setResendSuccess(true);
      setMessage("New verification email sent! Please check your inbox.");
    } catch (error) {
      setMessage(error.message || "Failed to resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <div className="text-center">
            <PageSpinner text="Verifying your email..." className="mb-4" />
            <p className="text-text-muted">
              Please wait while we verify your email address.
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-status-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-text-invert" size={32} />
            </div>
            <h1 className="font-heading font-bold text-2xl text-text-base mb-4">
              Email Verified!
            </h1>
            <p className="text-text-muted mb-6">{message}</p>
            <div className="space-y-3">
              <Link to="/auth/login" className="btn btn-primary w-full">
                Continue to Login
              </Link>
              <Link to="/" className="btn btn-secondary w-full">
                Go to Homepage
              </Link>
            </div>
          </div>
        );

      case "error":
        const errorType = searchParams.get("error");
        const userEmail = searchParams.get("email");
        const showResendOption =
          errorType === "token-expired" || errorType === "invalid-token";

        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-status-danger rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-text-invert" size={32} />
            </div>
            <h1 className="font-heading font-bold text-2xl text-text-base mb-4">
              {errorType === "token-expired"
                ? "Link Expired"
                : "Verification Failed"}
            </h1>
            <p className="text-text-muted mb-6">{message}</p>

            {/* Show email info for expired tokens */}
            {userEmail && errorType === "token-expired" && (
              <div className="p-4 bg-surface-background rounded-lg mb-6">
                <p className="text-sm text-text-muted">
                  <span className="font-medium">Account:</span> {userEmail}
                </p>
              </div>
            )}

            {/* Resend verification option for expired or invalid tokens */}
            {showResendOption && (
              <div className="space-y-4 mb-6">
                {resendSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-status-success text-sm">
                      New verification email sent! Please check your inbox.
                    </p>
                  </div>
                )}

                <button
                  onClick={() =>
                    userEmail
                      ? handleResendVerificationPublic(userEmail)
                      : handleResendVerification()
                  }
                  disabled={isResending || resendSuccess}
                  className={`btn btn-primary w-full ${
                    isResending || resendSuccess
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isResending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <ButtonSpinner />
                      <span>Sending new link...</span>
                    </div>
                  ) : resendSuccess ? (
                    "New Email Sent!"
                  ) : (
                    <>
                      <RotateCcw size={18} className="mr-2" />
                      Send New Verification Email
                    </>
                  )}
                </button>
              </div>
            )}

            {/* General resend option for logged-in users */}
            {!showResendOption && user && !user.isEmailVerified && (
              <div className="space-y-4 mb-6">
                {resendSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-status-success text-sm">
                      Verification email sent! Please check your inbox.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleResendVerification}
                  disabled={isResending || resendSuccess}
                  className={`btn btn-primary w-full ${
                    isResending || resendSuccess
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isResending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <ButtonSpinner />
                      <span>Sending...</span>
                    </div>
                  ) : resendSuccess ? (
                    "Email Sent!"
                  ) : (
                    <>
                      <RotateCcw size={18} className="mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="space-y-3">
              <Link to="/auth/login" className="btn btn-secondary w-full">
                Back to Login
              </Link>
              {errorType !== "already-verified" && (
                <Link to="/auth/register" className="btn btn-ghost w-full">
                  Create New Account
                </Link>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // If no token provided AND no URL parameters from backend redirect, show generic verification page
  if (!token && !searchParams.get("success") && !searchParams.get("error")) {
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
          </div>

          <div className="card">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-base rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-text-invert" size={32} />
              </div>
              <h1 className="font-heading font-bold text-2xl text-text-base mb-4">
                Check Your Email
              </h1>
              <p className="text-text-muted mb-6">
                We've sent a verification link to your email address. Please
                click the link to verify your account.
              </p>

              <div className="bg-surface-background rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-text-base mb-2">
                  Didn't receive the email?
                </h3>
                <ul className="text-sm text-text-muted space-y-1 text-left">
                  <li>• Check your spam or junk folder</li>
                  <li>• Make sure you entered the correct email address</li>
                  <li>• The link expires after 24 hours</li>
                </ul>
              </div>

              {user && !user.isEmailVerified && (
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className={`btn btn-primary w-full mb-4 ${
                    isResending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isResending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <ButtonSpinner />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <RotateCcw size={18} className="mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </button>
              )}

              <div className="space-y-3">
                <Link to="/auth/login" className="btn btn-secondary w-full">
                  Back to Login
                </Link>
                <Link to="/" className="btn btn-ghost w-full">
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        </div>

        <div className="card">{renderContent()}</div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-text-muted hover:text-brand-base transition-colors"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
