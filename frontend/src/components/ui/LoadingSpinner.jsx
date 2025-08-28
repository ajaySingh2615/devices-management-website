import React from "react";

const LoadingSpinner = ({
  size = "sm",
  color = "primary",
  className = "",
  showText = false,
  text = "Loading...",
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "border-brand-base border-t-transparent",
    secondary: "border-text-muted border-t-transparent",
    white: "border-white border-t-transparent",
    success: "border-status-success border-t-transparent",
    danger: "border-status-danger border-t-transparent",
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Spinner */}
      <div className="relative">
        {/* Main spinning ring */}
        <div
          className={`
             ${sizeClasses[size]} 
             rounded-full 
             border-2
             ${colorClasses[color]}
             animate-spin
           `}
        />
        {/* Inner glow effect */}
        <div
          className={`
             absolute 
             ${size === "xs" || size === "sm" ? "inset-0.5" : "inset-1"}
             rounded-full 
             border
             border-transparent
             ${
               color === "white"
                 ? "border-b-white/40"
                 : "border-b-brand-base/40"
             }
             animate-spin 
             [animation-direction:reverse] 
             [animation-duration:1.5s]
           `}
        />
      </div>

      {/* Loading text */}
      {showText && (
        <span
          className={`${textSizeClasses[size]} text-text-muted animate-pulse`}
        >
          {text}
        </span>
      )}
    </div>
  );
};

// Preset loading spinner variants
export const ButtonSpinner = ({ className = "" }) => (
  <LoadingSpinner size="sm" color="white" className={className} />
);

export const FormSpinner = ({ text = "Processing...", className = "" }) => (
  <LoadingSpinner
    size="md"
    color="primary"
    showText={true}
    text={text}
    className={`justify-center ${className}`}
  />
);

export const PageSpinner = ({ text = "Loading...", className = "" }) => (
  <div className={`flex flex-col items-center space-y-4 ${className}`}>
    <LoadingSpinner size="xl" color="primary" />
    <p className="text-text-muted text-lg animate-pulse">{text}</p>
  </div>
);

export default LoadingSpinner;
