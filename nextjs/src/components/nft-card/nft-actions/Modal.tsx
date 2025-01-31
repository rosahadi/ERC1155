import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isConfirmPending: boolean;
  title: string;
  children: React.ReactNode;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  isConfirmPending,
  title,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-card p-12 rounded-lg w-full max-w-[35rem] h-auto mx-4 shadow-2xl shadow-[#00ffff]/15 animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-5 border-solid border-b border-card-neon">
          <h2 className="text-text-primary text-4xl font-bold">
            {title}
          </h2>
        </div>
        <div className="space-y-6 mt-5">{children}</div>

        <div className="flex justify-between gap-5 mt-9">
          <button
            onClick={onClose}
            className="action-button bg-background-glow"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isConfirmPending}
            className="action-button bg-button "
          >
            {isConfirmPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
