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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface-card rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-text-base transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-center space-x-3 mb-4">
            {showIcon && (
              <div
                className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
              >
                <IconComponent className="text-text-invert" size={24} />
              </div>
            )}
            <h3 className="font-heading font-semibold text-lg text-text-base">
              {title}
            </h3>
          </div>

          {/* Message */}
          <p className="text-text-muted mb-6 leading-relaxed">{message}</p>

          {/* Actions */}
          {actions ? (
            <div className="flex justify-end space-x-3">{actions}</div>
          ) : (
            <div className="flex justify-end">
              <button onClick={onClose} className="btn btn-primary">
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
