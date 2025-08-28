import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info", // "success", "error", "info", "warning"
  showIcon = true,
  actions = null,
  autoClose = false,
  autoCloseDelay = 3000,
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-status-success",
          textColor: "text-status-success",
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-status-danger",
          textColor: "text-status-danger",
          borderColor: "border-red-200",
        };
      case "warning":
        return {
          icon: AlertCircle,
          bgColor: "bg-accent-base",
          textColor: "text-accent-text",
          borderColor: "border-yellow-200",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-status-info",
          textColor: "text-status-info",
          borderColor: "border-blue-200",
        };
    }
  };

  const {
    icon: IconComponent,
    bgColor,
    textColor,
    borderColor,
  } = getIconAndColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
      {/* Enhanced Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Premium Modal */}
      <div className="relative bg-gradient-to-br from-surface-card via-surface-card to-surface-background rounded-3xl shadow-2xl border border-surface-border/50 max-w-lg w-full transform transition-all animate-in zoom-in-90 slide-in-from-bottom-8 duration-500 overflow-hidden">
        {/* Decorative top border */}
        <div className={`h-1 w-full ${bgColor} opacity-80`} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 text-text-muted hover:text-text-base hover:bg-surface-background/80 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90 backdrop-blur-sm z-10"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-10 pt-8">
          {/* Icon and Title */}
          <div className="flex flex-col items-center text-center mb-8">
            {showIcon && (
              <div
                className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center animate-in zoom-in-50 duration-700 delay-150 shadow-xl mb-4 relative overflow-hidden`}
              >
                {/* Icon glow effect */}
                <div
                  className={`absolute inset-0 ${bgColor} opacity-20 rounded-full animate-pulse`}
                />
                <IconComponent
                  className="text-text-invert relative z-10"
                  size={28}
                />
              </div>
            )}
            <h3 className="font-heading font-bold text-2xl text-text-base mb-2 animate-in slide-in-from-bottom-5 duration-500 delay-300">
              {title}
            </h3>
          </div>

          {/* Message */}
          <p className="text-text-muted mb-10 leading-relaxed text-lg text-center animate-in slide-in-from-bottom-5 duration-500 delay-400">
            {message}
          </p>

          {/* Actions */}
          {actions ? (
            <div className="flex justify-center space-x-4 animate-in slide-in-from-bottom-5 duration-500 delay-500">
              {actions}
            </div>
          ) : (
            <div className="flex justify-center animate-in slide-in-from-bottom-5 duration-500 delay-500">
              <button
                onClick={onClose}
                className={`btn btn-primary min-w-[140px] px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl focus:scale-105 focus:shadow-xl ${bgColor} hover:brightness-110 relative overflow-hidden group`}
              >
                <span className="relative z-10">Continue</span>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
