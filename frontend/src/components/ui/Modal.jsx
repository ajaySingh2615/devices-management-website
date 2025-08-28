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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface-card rounded-3xl shadow-2xl border border-surface-border max-w-md w-full transform transition-all animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-base hover:bg-surface-background rounded-full transition-all duration-200 hover:scale-110"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Icon and Title */}
          <div className="flex items-start space-x-4 mb-6">
            {showIcon && (
              <div
                className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500 delay-150 shadow-lg`}
              >
                <IconComponent className="text-text-invert" size={26} />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-heading font-bold text-xl text-text-base mb-1 animate-in slide-in-from-left-5 duration-500 delay-200">
                {title}
              </h3>
            </div>
          </div>

          {/* Message */}
          <p className="text-text-muted mb-8 leading-relaxed text-base animate-in slide-in-from-left-5 duration-500 delay-300">
            {message}
          </p>

          {/* Actions */}
          {actions ? (
            <div className="flex justify-end space-x-3 animate-in slide-in-from-bottom-5 duration-500 delay-400">
              {actions}
            </div>
          ) : (
            <div className="flex justify-end animate-in slide-in-from-bottom-5 duration-500 delay-400">
              <button
                onClick={onClose}
                className="btn btn-primary min-w-[100px] transition-all duration-200 hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
