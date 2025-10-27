import React, { useRef, useState } from "react";
import type { ReactNode } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface DropdownProps {
  button: ReactNode;
  children: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ button, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <button
        className="p-2 border"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {button}
      </button>

      {isOpen && (
        <div
          className="p-4 w-max border bg-white shadow"
          style={{ position: "absolute", zIndex: 10 }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
