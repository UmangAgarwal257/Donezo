import { ArrowLeftIcon, Github } from "lucide-react";
import React from "react";
import Link from "next/link";

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
            className="flex items-center text-white gap-2 px-3 py-1 rounded-md"
            style={{
              background:
                "linear-gradient(180deg, #222223 0%, rgba(34, 34, 35, 0.6) 68.75%)",
            }}
          >
            <ArrowLeftIcon size={16} />
            <span>Back</span>
          </button>
        )}
        <Link href="/" className="bg-clip-text bg-gradient-to-br from-white via-30% via-white to-white/30 font-bold text-2xl text-center leading-[1.2] md:leading-[1.3] text-transparent">
          Donezo
        </Link>
      </div>
      <a
        href="https://github.com/UmangAgarwal257/Donezo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
      >
        <Github size={20} />
        <span className="hidden md:inline">GitHub</span>
      </a>
    </header>
  );
};

export default Navbar;