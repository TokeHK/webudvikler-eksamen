import { useRef, type ReactNode, type FC } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    if (isOpen) onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* bg-black/50 til 50% opacity hvis bg er uden om alt content */}

      {/* Content */}
      <div ref={ref} className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
};