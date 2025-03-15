import { ArrowLeftIcon } from "lucide-react";
import React from "react";

interface NavbarProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

const Navbar = ({ onBack, showBackButton }: NavbarProps) => {
  return (
    <header className="relative flex justify-between items-center mx-auto max-md:px-3 py-4 w-full max-w-6xl">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1 rounded-md"
            style={{
              background:
                "linear-gradient(180deg, #222223 0%, rgba(34, 34, 35, 0.6) 68.75%)",
            }}
          >
            <ArrowLeftIcon size={16} />
            <span>Back</span>
          </button>
        )}
        <span className="font-bold text-2xl">Donezo</span>
      </div>
    </header>
  );
};

export default Navbar;